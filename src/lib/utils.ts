import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function toQueryString(obj: Record<string, string | number>) {
  const params = new URLSearchParams();
  for (const key in obj) {
    params.append(key, obj[key] as string);
  }
  return params.toString();
}

export function formatDevice(principal: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('fr-Fr', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits:
      maximumFractionDigits !== undefined ? maximumFractionDigits : undefined,
  }).format(principal);
}

export function formatPercent(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    signDisplay: 'always',
  }).format(value);
}
