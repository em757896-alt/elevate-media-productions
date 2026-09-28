const BOT_PATTERNS: RegExp[] = [
  /bot\b/i,
  /crawler/i,
  /spider/i,
  /headless/i,
  /phantomjs/i,
  /puppeteer/i,
  /playwright/i,
  /selenium/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /go-http-client/i,
  /java\//i,
  /libwww/i,
  /httpclient/i,
  /scrapy/i,
  /axios/i,
  /okhttp/i,
  /rust/i,
  /^node/i,
  /facebookexternalhit/i,
  /slurp/i,
  /bingpreview/i,
  /yandex/i,
  /baiduspider/i,
  /duckduckbot/i,
  /applebot/i,
  /gptbot/i,
  /chatgpt/i,
  /ccbot/i,
  /semrush/i,
  /ahrefs/i,
  /mj12bot/i,
  /petalbot/i,
  /dotbot/i,
  /ia_archiver/i,
  /exabot/i,
  /archive\.org_bot/i,
  /discoverbot/i,
  /qwantbot/i,
  /monitor/i
];

const LEGIT_SUBSTRINGS = ['mozilla', 'chrome', 'safari', 'firefox', 'edg', 'opr', 'android', 'iphone', 'ipad', 'windows'];

export function isBotUserAgent(ua: string): boolean {
  const trimmed = ua.trim();
  if (!trimmed) return true;
  // Real browsers always identify themselves with Mozilla/.
  if (!ua.includes('Mozilla')) return !LEGIT_SUBSTRINGS.some((s) => ua.toLowerCase().includes(s));
  return BOT_PATTERNS.some((re) => re.test(ua)) && !LEGIT_SUBSTRINGS.some((s) => ua.toLowerCase().includes(s));
}