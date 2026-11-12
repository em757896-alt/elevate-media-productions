import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { verifyTurnstile } from '$lib/server/turnstile';
import { isDisposableEmail } from '$lib/server/disposable-email';
import { consumeRateLimit } from '$lib/server/rate-limit';
import { database } from '$lib/server/neon';

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;
const SITE_EMAIL = 'elevatemediaproductions1@gmail.com';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const limited = await consumeRateLimit('contact:' + getClientAddress(), 3, 900);
  if (!limited.allowed) throw error(429, 'Too many messages. Please wait before trying again.');

  let payload: Record<string, unknown>;
  try { payload = await request.json(); } catch { throw error(400, 'Invalid request body.'); }
  if (payload.website) return json({ ok: true });

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const subject = typeof payload.subject === 'string' ? payload.subject.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const turnstile = typeof payload.turnstile === 'string' ? payload.turnstile : '';

  if (!name || !email || !subject || !message || name.length > MAX_NAME || email.length > MAX_EMAIL ||
    subject.length > MAX_SUBJECT || message.length > MAX_MESSAGE || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    throw error(400, 'Please fill in all fields with valid values.');
  }
  if (isDisposableEmail(email)) throw error(400, 'Please use a non-disposable email address.');
  if (!(await verifyTurnstile(turnstile))) throw error(400, 'Human verification could not be completed. Please refresh the page and try again.');

  let messageId: string;
  try {
    const rows = await database()`INSERT INTO contact_messages (name,email,subject,message)
      VALUES (${name},${email},${subject},${message}) RETURNING id`;
    messageId = String(rows[0].id);
  } catch (cause) {
    console.error('Contact persistence failed:', cause);
    throw error(503, 'We could not save your message right now. Please try again later.');
  }

  const apiKey = (env.BREVO_API_KEY ?? '').trim();
  if (!apiKey) {
    console.error('Contact message saved for delivery; BREVO_API_KEY is not configured.', messageId);
    return json({ ok: true, queued: true });
  }

  const senderEmail = (env.CONTACT_SENDER ?? '').trim() || SITE_EMAIL;
  const recipient = (env.CONTACT_TO ?? '').trim() || SITE_EMAIL;
  const senderName = (env.CONTACT_SENDER_NAME ?? '').trim() || 'Elevate Media Productions';
  const body = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: recipient, name: 'Elevate Media Productions' }],
    replyTo: { email, name },
    subject: 'New website message: ' + subject,
    htmlContent: '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;">' +
      '<p style="font-size:22px;font-weight:700;margin:0 0 16px;">New message from the website</p>' +
      '<p><strong>From:</strong> ' + escapeHtml(name) + ' &lt;' + escapeHtml(email) + '&gt;</p>' +
      '<p><strong>Subject:</strong> ' + escapeHtml(subject) + '</p>' +
      '<p><strong>Message:</strong></p><pre style="white-space:pre-wrap;font-family:inherit;line-height:1.6;">' + escapeHtml(message) + '</pre></div>',
    textContent: 'New message from the website\\n\\nFrom: ' + name + ' <' + email + '>\\nSubject: ' + subject + '\\n\\n' + message
  };

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify(body), signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('Brevo contact delivery failed', res.status, detail.slice(0, 500));
      await database()`UPDATE contact_messages SET delivery_status='failed', delivery_error=${'Brevo HTTP ' + res.status} WHERE id=${messageId}::uuid`;
      return json({ ok: true, queued: true });
    }
    await database()`UPDATE contact_messages SET delivery_status='sent', delivery_error=NULL WHERE id=${messageId}::uuid`;
  } catch (cause) {
    console.error('Brevo contact delivery error:', cause);
    await database()`UPDATE contact_messages SET delivery_status='failed', delivery_error='Email delivery unavailable' WHERE id=${messageId}::uuid`;
  }

  return json({ ok: true, queued: true });
};

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
