import { loggerMiddleware } from '../utils/loggerMiddleware';

const STORAGE_KEY = 'shortUrls';

export const generateCode = () => Math.random().toString(36).substr(2, 6);

export const getAllUrls = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

export const saveShortUrl = (originalUrl, validity, customCode) => {
  const urls = getAllUrls();
  let shortcode = customCode || generateCode();

  if (urls[shortcode]) throw new Error('Shortcode already exists');

  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + (validity || 30) * 60000).toISOString();

  urls[shortcode] = {
    originalUrl,
    createdAt,
    expiresAt,
    clicks: []
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  loggerMiddleware('Shortened URL created', { shortcode, originalUrl });

  return { shortcode, originalUrl, createdAt, expiresAt };
};

export const recordClick = (shortcode) => {
  const urls = getAllUrls();
  const urlData = urls[shortcode];
  if (!urlData) return;
  urlData.clicks.push({
    timestamp: new Date().toISOString(),
    location: 'India',
    source: document.referrer || 'Direct'
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
};
