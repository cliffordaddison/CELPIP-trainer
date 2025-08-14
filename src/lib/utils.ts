import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function calculateBand(score: number): number {
  return Math.max(1, Math.min(12, Math.ceil(score)))
}

export function getBandColor(band: number): string {
  if (band >= 10) return 'text-green-600'
  if (band >= 7) return 'text-blue-600'
  if (band >= 4) return 'text-yellow-600'
  return 'text-red-600'
}

export function getBandLabel(band: number): string {
  if (band >= 10) return 'Advanced'
  if (band >= 7) return 'Intermediate'
  if (band >= 4) return 'Basic'
  return 'Beginner'
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
