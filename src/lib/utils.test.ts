import { describe, it, expect } from 'vitest'
import { formatDate, formatTime, calculateBand, getBandColor, getBandLabel } from './utils'

describe('Utils', () => {
  it('formatDate formats date correctly', () => {
    const date = new Date('2024-01-15')
    const formatted = formatDate(date)
    expect(formatted).toContain('January 15, 2024')
  })

  it('formatTime formats seconds correctly', () => {
    expect(formatTime(65)).toBe('1:05')
    expect(formatTime(120)).toBe('2:00')
    expect(formatTime(45)).toBe('0:45')
  })

  it('calculateBand returns correct band', () => {
    expect(calculateBand(3.2)).toBe(4)
    expect(calculateBand(7.8)).toBe(8)
    expect(calculateBand(11.5)).toBe(12)
    expect(calculateBand(0.5)).toBe(1)
  })

  it('getBandColor returns correct colors', () => {
    expect(getBandColor(11)).toBe('text-green-600')
    expect(getBandColor(8)).toBe('text-blue-600')
    expect(getBandColor(5)).toBe('text-yellow-600')
    expect(getBandColor(2)).toBe('text-red-600')
  })

  it('getBandLabel returns correct labels', () => {
    expect(getBandLabel(11)).toBe('Advanced')
    expect(getBandLabel(8)).toBe('Intermediate')
    expect(getBandLabel(5)).toBe('Basic')
    expect(getBandLabel(2)).toBe('Beginner')
  })
})
