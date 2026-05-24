import clsx, { type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function scrollToId(id: string) {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 88;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: 'smooth' });
}
