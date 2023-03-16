import { getDataFromUrl } from './axios';

describe('getDataFromUrl function', () => {
  it('should return data from a valid URL', async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    const result = await getDataFromUrl(url)

    expect(result).toBeDefined()
    expect(result).toHaveProperty('userId')
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('title')
    expect(result).toHaveProperty('completed')
  })

  it('should handle errors and log them to the console', async () => {
    const url = 'https://jsonplaceholder.typicode.com/non-existent-url'
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {})
    const result = await getDataFromUrl(url)

    expect(result).toBeNull()
    expect(consoleErrorMock).toHaveBeenCalled()
    expect(consoleErrorMock.mock.calls[0][0]).toBeInstanceOf(Error)

    consoleErrorMock.mockRestore()
  })
})