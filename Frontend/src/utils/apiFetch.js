export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('smartlogix_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem('smartlogix_token');
    localStorage.removeItem('smartlogix_session');
    localStorage.removeItem('smartlogix_user');
    window.location.reload();
  }

  return res;
};
