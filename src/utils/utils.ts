/**
 * remove all unnecessary symbols from string
 * @param str - string value to sanitize
 */
export function sanitizeString(str: string): string {
  return str.replace(/[+|\n'\s]{2,}/g, '').replace(/['"]/g, '')
}

export type CurrencyWithValue = {
  valueWithCurrency: string | null,
  currency: string | null,
  value: number | null
}

/**
 * Extracts the currency symbol, value with currency, and numeric value from a string containing a currency value.
 *
 * @param str The string to extract the currency and value from.
 * @returns An object containing the currency symbol, value with currency, and numeric value extracted from the input string.
 */
export function getCurrencyAndValue(str: string): CurrencyWithValue {
  const [valueWithCurrency, currency, value] = str.match(/([£$€])(\d+\.\d{2})/)?.values() ?? []
  return {
    valueWithCurrency: valueWithCurrency ?? null,
    currency: currency ?? null,
    value: Number.isNaN(+value) ? null : +value
  }
}