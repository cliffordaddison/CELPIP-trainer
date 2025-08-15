import { describe, it, expect } from 'vitest'
import { formatDate, formatTime, calculateBand, getBandColor, getBandLabel, generateId, debounce } from '../utils'

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15')
      const result = formatDate(date)
      expect(result).toBe('January 15, 2024')
    })
  })

  describe('formatTime', () => {
    it('formats seconds to MM:SS', () => {
      expect(formatTime(65)).toBe('1:05')
      expect(formatTime(125)).toBe('2:05')
      expect(formatTime(0)).toBe('0:00')
      expect(formatTime(30)).toBe('0:30')
    })
  })

  describe('calculateBand', () => {
    it('calculates band scores correctly', () => {
      expect(calculateBand(0)).toBe(1)
      expect(calculateBand(3.2)).toBe(4)
      expect(calculateBand(6.7)).toBe(7)
      expect(calculateBand(9.1)).toBe(10)
      expect(calculateBand(12.5)).toBe(12)
      expect(calculateBand(15)).toBe(12) // Max is 12
    })
  })

  describe('getBandColor', () => {
    it('returns correct colors for different bands', () => {
      expect(getBandColor(1)).toBe('text-red-600')
      expect(getBandColor(4)).toBe('text-yellow-600')
      expect(getBandColor(7)).toBe('text-blue-600')
      expect(getBandColor(10)).toBe('text-green-600')
      expect(getBandColor(12)).toBe('text-green-600')
    })
  })

  describe('getBandLabel', () => {
    it('returns correct labels for different bands', () => {
      expect(getBandLabel(1)).toBe('Beginner')
      expect(getBandLabel(4)).toBe('Basic')
      expect(getBandLabel(7)).toBe('Intermediate')
      expect(getBandLabel(10)).toBe('Advanced')
      expect(getBandLabel(12)).toBe('Advanced')
    })
  })

  describe('generateId', () => {
    it('generates a string ID', () => {
      const id1 = generateId()
      const id2 = generateId()
      
      expect(typeof id1).toBe('string')
      expect(id1.length).toBeGreaterThan(0)
      expect(id1).not.toBe(id2) // IDs should be unique
    })
  })

  describe('debounce', () => {
    it('debounces function calls', async () => {
      let callCount = 0
      const debouncedFn = debounce(() => {
        callCount++
      }, 100)

      // Call multiple times quickly
      debouncedFn()
      debouncedFn()
      debouncedFn()

      // Should not have been called yet
      expect(callCount).toBe(0)

      // Wait for debounce delay
      await new Promise(resolve => setTimeout(resolve, 150))

      // Should have been called once
      expect(callCount).toBe(1)
    })

    it('resets timer on subsequent calls', async () => {
      let callCount = 0
      const debouncedFn = debounce(() => {
        callCount++
      }, 100)

      debouncedFn()
      
      // Wait 50ms, then call again
      await new Promise(resolve => setTimeout(resolve, 50))
      debouncedFn()
      
      // Wait another 50ms - should not have been called yet
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(callCount).toBe(0)
      
      // Wait for full delay
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(callCount).toBe(1)
    })
  })
})