export const loggerMiddleware = (message, data = {}) => {
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push({ timestamp: new Date().toISOString(), message, ...data });
  localStorage.setItem('logs', JSON.stringify(logs));
};