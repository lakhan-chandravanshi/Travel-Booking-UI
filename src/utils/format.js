import { format, isValid, parseISO } from 'date-fns';

const toDate = (value) => {
  if (!value) return null;
  const d = typeof value === 'string' ? parseISO(value) : new Date(value);
  return isValid(d) ? d : null;
};

export const formatDate = (value, fmt = 'd MMM yyyy') => {
  const d = toDate(value);
  return d ? format(d, fmt) : '';
};

export const formatTime = (value) => {
  const d = toDate(value);
  return d ? format(d, 'HH:mm') : '';
};

export const formatRange = (start, end) => {
  const s = toDate(start);
  const e = toDate(end);
  if (s && e) {
    const sameYear = s.getFullYear() === e.getFullYear();
    return `${format(s, sameYear ? 'd MMM' : 'd MMM yyyy')} – ${format(e, 'd MMM yyyy')}`;
  }
  if (s) return format(s, 'd MMM yyyy');
  return 'Dates flexible';
};

export const formatMoney = (price) => {
  if (!price || price.amount == null) return '';
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: price.currency || 'INR',
      maximumFractionDigits: 0,
    }).format(price.amount);
  } catch {
    return `${price.currency || ''} ${price.amount}`.trim();
  }
};

export const fileSize = (bytes) => {
  if (!bytes) return '';
  const units = ['B', 'KB', 'MB'];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
};

export const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('') || 'U';
