import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
  const { user } = await locals.safeGetSession();
  if (!user) throw error(401, 'You must be signed in.');
  const supabase = locals.supabase;
  if (!supabase) throw error(503, 'Messaging is not configured yet.');

  const partnerId = url.searchParams.get('with');
  if (!partnerId) throw error(400, 'Missing conversation partner.');

  const { data, error: e } = await supabase
    .from('forum_messages')
    .select('id,sender_id,recipient_id,content,read_at,created_at')
    .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
    .or(`sender_id.eq.${partnerId},recipient_id.eq.${partnerId}`)
    .order('created_at', { ascending: true });

  if (e) throw error(500, e.message);
  return json({ messages: data ?? [] });
};

export const POST: RequestHandler = async ({ request, locals }) => {
  const { user } = await locals.safeGetSession();
  if (!user) throw error(401, 'You must be signed in to send messages.');
  const supabase = locals.supabase;
  if (!supabase) throw error(503, 'Messaging is not configured yet.');

  let payload: { recipient_id?: unknown; content?: unknown };
  try {
    payload = await request.json();
  } catch {
    throw error(400, 'Invalid request body.');
  }

  const recipientId = typeof payload.recipient_id === 'string' ? payload.recipient_id.trim() : '';
  const content = typeof payload.content === 'string' ? payload.content.trim() : '';

  if (!recipientId) throw error(400, 'Missing recipient.');
  if (recipientId === user.id) throw error(400, 'You cannot message yourself.');
  if (content.length < 1 || content.length > 4000) {
    throw error(400, 'Message must be between 1 and 4,000 characters.');
  }

  const { data: recipient } = await supabase.from('profiles').select('id').eq('id', recipientId).maybeSingle();
  if (!recipient) throw error(404, 'Recipient not found.');

  const { data, error: e } = await supabase
    .from('forum_messages')
    .insert({ sender_id: user.id, recipient_id: recipientId, content })
    .select('id,sender_id,recipient_id,content,read_at,created_at')
    .single();

  if (e) throw error(500, e.message);
  return json({ message: data });
};