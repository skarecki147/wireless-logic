import axios from 'axios';

/**
 * Fetches data from a specified URL using an HTTP GET request.
 *
 * @param url The URL to fetch data from.
 * @returns A Promise that resolves to the response data as a string, or null if an error occurred.
 * @throws An error if the HTTP request fails.
 */
export async function getDataFromUrl(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null
  }
}