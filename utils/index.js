export const formatDate = (dt) => {
  if (!dt) {
    return '';
  }
  const date = new Date(dt * 1000);
  const localeDate = Intl.DateTimeFormat('en-US').format(date);
  return `${localeDate} ${date.toLocaleTimeString()}`;
};

export const getDateString = (dt) => {
  if (!dt) {
    return '';
  }
  const date = new Date(dt * 1000);
  const localeDate = Intl.DateTimeFormat('en-US').format(date);
  return `${localeDate}`;
};

export const getTimeString = (dt) => {
  if (!dt) {
    return '';
  }
  const date = new Date(dt * 1000);
  return `${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    timezone: 'short',
  })}`;
};

export const formatTemp = (temp) => {
  return `${temp}°`;
};

export const formatPercentage = (num) => {
  return `${(num * 100).toFixed(2)}%`;
};
