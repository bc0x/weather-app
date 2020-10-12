export const formatDate = (dt) => {
  if (!dt) {
    return '';
  }
  const date = new Date(dt * 1000);
  const localeDate = Intl.DateTimeFormat('en-US').format(date);
  return `${localeDate} ${date.toLocaleTimeString()}`;
};

export const getTimeString = (dt) => {
  if (!dt) {
    return '';
  }
  const date = new Date(dt * 1000);
  return `${date.toLocaleTimeString()}`;
};
