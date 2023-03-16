import { getCurrencyAndValue, sanitizeString } from './utils';
import { expect } from '@jest/globals';

describe('sanitizeString function', () => {
  it('should remove unnecessary symbols from the string', () => {
    const input = '£174.00(inc. VAT)Per Year\'  \'     Save £17.90 on the monthly price\'  \''
    const expectedOutput = '£174.00(inc. VAT)Per YearSave £17.90 on the monthly price'
    const output = sanitizeString(input)
    expect(output).toEqual(expectedOutput)
  })
})

describe('getCurrencyAndValue', () => {
  test('should return object of type CurrencyWithValue', () => {
    const str = 'Example string with price £42.12'
    const res = getCurrencyAndValue(str)

    expect(res.value).toEqual(42.12)
    expect(res.valueWithCurrency).toEqual('£42.12')
    expect(res.currency).toEqual('£')
  })
})
