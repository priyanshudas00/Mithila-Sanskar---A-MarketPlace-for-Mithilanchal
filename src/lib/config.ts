export const getSiteOrigin = () => {
  const envUrl = import.meta.env.VITE_SITE_URL;
  if (envUrl) {
    try {
      const url = new URL(envUrl);
      return `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ``}`;
    } catch (e) {
      // fallthrough to runtime origin
    }
  }
  return window.location.origin;
};

export const siteUrlIsMisconfigured = () => {
  const envUrl = import.meta.env.VITE_SITE_URL;
  if (!envUrl) return false;
  try {
    const envHost = new URL(envUrl).hostname;
    const currentHost = window.location.hostname;
    if (envHost.includes('localhost') && !currentHost.includes('localhost')) return true;
    if (envHost !== currentHost) return true;
    return false;
  } catch (e) {
    return false;
  }
};