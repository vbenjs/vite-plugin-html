import { describe, test, expect } from 'vitest'
import { htmlFilter } from '../utils/createHtmlFilter'

describe('utils test.', () => {
  test('createHtmlFilter > htmlFilter.', async () => {
    expect(htmlFilter('index.html')).toBe(true)
    expect(htmlFilter('index.html.html')).toBe(true)
    expect(htmlFilter('/index.html')).toBe(true)
    expect(htmlFilter('/index.html/index.html')).toBe(true)
    expect(htmlFilter('users/index.html')).toBe(true)

    expect(htmlFilter('index.htm')).toBe(false)
    expect(htmlFilter('index.css')).toBe(false)
    expect(htmlFilter('index.js')).toBe(false)
    expect(htmlFilter('index.ts')).toBe(false)
    expect(htmlFilter('./index.html')).toBe(false)
  })
})
