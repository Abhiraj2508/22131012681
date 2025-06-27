export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const isAlphanumeric = (str) => /^[a-zA-Z0-9]+$/.test(str);
