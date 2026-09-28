export const legal = {
  effectiveDate: '2026-09-24',
  controller: 'Elevate Media Productions',
  contactEmail: 'elevatemediaproductions1@gmail.com',
  website: 'https://elevate-media-productions.vercel.app',
  jurisdiction: 'Kenya'
};

export interface LegalSection {
  heading: string;
  body: string[];
}

export const privacySections: LegalSection[] = [
  {
    heading: '1. Who we are',
    body: [
      `This Privacy Policy explains how ${legal.controller} ("we", "us") collects, uses and protects your personal data when you visit ${legal.website} or use our services.`,
      'We are a digital studio based in Kenya. We are committed to protecting your privacy in line with the Kenya Data Protection Act, 2019 and its regulations, as well as the EU General Data Protection Regulation (GDPR) where it applies to individuals in the European Economic Area.'
    ]
  },
  {
    heading: '2. What we collect',
    body: [
      'Contact form: name, email address, subject and message when you contact us.',
      'Account registration: full name and email address when you create an account.',
      'Forum: your username, posts, replies and votes when you participate in the community.',
      'Newsletter: your email address (and possibly name) when you subscribe.',
      'Technical data: IP address, browser type and device information, collected automatically by our hosting provider (Vercel) and email provider (Brevo) to operate and secure the service.'
    ]
  },
  {
    heading: '3. How we use your data',
    body: [
      'To respond to enquiries you send through the contact form.',
      'To create and manage your account and authenticate you securely.',
      'To operate the forum and display your public contributions.',
      'To send the newsletter you subscribe to (with your consent, via double opt-in).',
      'To improve the site, ensure security, and comply with legal obligations.'
    ]
  },
  {
    heading: '4. Lawful basis',
    body: [
      'We process personal data on the following lawful bases: your consent (newsletter; you can withdraw anytime), performance of a contract (account creation and forum participation), legitimate interest (responding to enquiries, security and abuse prevention), and legal obligation (record-keeping where required).',
      'For GDPR purposes, consent is obtained at the point of collection and can be withdrawn at any time by contacting us.'
    ]
  },
  {
    heading: '5. Processors and third parties',
    body: [
      'Supabase (authentication, database and object storage) — stores account, profile and forum data.',
      'Brevo (transactional email) — processes contact form and newsletter emails.',
      'Vercel (hosting) — stores server logs including IP addresses.',
      'Cloudflare (Turnstile, CAPTCHA) — processes a widget response token to verify you are human; it is subject to Cloudflare\'s own Privacy Policy.',
      'These processors may transfer data across borders, including to the United States and the EU, under appropriate safeguards such as the European Commission\'s Standard Contractual Clauses and the Kenya ODPC\'s cross-border transfer provisions.'
    ]
  },
  {
    heading: '6. How long we keep data',
    body: [
      'Contact form messages: up to 24 months.',
      'Accounts and forum contributions: for as long as your account remains active; deleted when you request deletion.',
      'Newsletter subscriptions: until you unsubscribe or withdraw consent.',
      'Server logs: as retained by Vercel in line with their retention policy.'
    ]
  },
  {
    heading: '7. Your rights',
    body: [
      'Under the Kenya Data Protection Act, 2019 you have the right to: access your data, correct inaccuracies, request deletion, restrict or object to processing, data portability, and lodge a complaint with the Office of the Data Protection Commissioner (ODPC).',
      `You can exercise these rights at any time by emailing ${legal.contactEmail}. We respond within 30 days.`,
      'If you are in the EU/EEA, the GDPR gives you corresponding rights, including the right to complain to your local supervisory authority.'
    ]
  },
  {
    heading: '8. Cookies and tracking',
    body: [
      'We do not use advertising or analytics cookies. We use essential authentication cookies (Supabase) to keep you signed in, and a small consent cookie to remember your preference about this policy.',
      'A CAPTCHA (Cloudflare Turnstile) may process minimal data when you use our forms to prevent abuse.',
      'You can clear cookies at any time through your browser settings.'
    ]
  },
  {
    heading: '9. Security',
    body: [
      'We protect your data with HTTPS, secure password storage (hashed by Supabase Auth), email verification, rate limiting to prevent abuse, and access controls. No method of transmission is 100% secure, but we take reasonable and proportionate safeguards.'
    ]
  },
  {
    heading: '10. Children',
    body: [
      'Our services are not directed to children under 16, and we do not knowingly collect personal data from children. If you believe a child has provided us data, contact us and we will delete it.'
    ]
  },
  {
    heading: '11. Changes to this policy',
    body: [
      'We may update this policy from time to time. The current version is always published on this page with the effective date shown above.'
    ]
  },
  {
    heading: '12. Contact',
    body: [
      `Questions or data requests: email ${legal.contactEmail}.`,
      `Operator: ${legal.controller}, registered/based in ${legal.jurisdiction}.`
    ]
  }
];

export const termsSections: LegalSection[] = [
  {
    heading: '1. Acceptance of terms',
    body: [
      `By accessing ${legal.website} or using our services you agree to these Terms of Service. If you do not agree, please do not use the site.`
    ]
  },
  {
    heading: '2. The service',
    body: [
      'Elevate Media Productions provides web applications, mobile apps, brand platforms and related digital services, as well as a community forum and blog on this website.',
      'We may modify, suspend or discontinue any part of the service at any time, with or without notice.'
    ]
  },
  {
    heading: '3. Accounts and conduct',
    body: [
      'You are responsible for safeguarding your account credentials and for all activity under your account.',
      'You agree not to: use the service unlawfully; attempt to gain unauthorised access to systems or data; send spam, malware or abusive content; interfere with or overload the service; scrape content at scale without permission; or impersonate others.',
      'We may suspend or terminate accounts that violate these terms.'
    ]
  },
  {
    heading: '4. User-generated content',
    body: [
      'You retain ownership of content you post to the forum. By posting, you grant us a worldwide, non-exclusive, royalty-free licence to host and display that content on the site.',
      'You must not post content that infringes others\' rights or is unlawful. We may remove content at our discretion.'
    ]
  },
  {
    heading: '5. Intellectual property',
    body: [
      'The site design, code, brand name and logo are owned by Elevate Media Productions. You may not reproduce them without permission.'
    ]
  },
  {
    heading: '6. Privacy',
    body: [
      'Your use of the site is also governed by our Privacy Policy, which explains how we handle personal data.',
      `Read it here: ${legal.website}/privacy`
    ]
  },
  {
    heading: '7. Disclaimer of warranties',
    body: [
      'The service is provided "as is" and "as available" without warranties of any kind, whether express or implied, including merchantability or fitness for a particular purpose.'
    ]
  },
  {
    heading: '8. Limitation of liability',
    body: [
      'To the maximum extent permitted by law, Elevate Media Productions shall not be liable for any indirect, incidental, special or consequential damages arising from your use of or inability to use the service.'
    ]
  },
  {
    heading: '9. External links',
    body: [
      'Our site may link to external websites, including client projects and social media. We are not responsible for the content or practices of third-party sites.'
    ]
  },
  {
    heading: '10. Governing law and jurisdiction',
    body: [
      `These terms are governed by the laws of ${legal.jurisdiction}. Disputes shall be subject to the exclusive jurisdiction of the courts of ${legal.jurisdiction}, except where mandatory law provides otherwise.`
    ]
  },
  {
    heading: '11. Changes to these terms',
    body: [
      'We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the new terms.'
    ]
  },
  {
    heading: '12. Contact',
    body: [
      `Questions about these terms: email ${legal.contactEmail}.`
    ]
  }
];