import { CheerioAPI, load } from 'cheerio';
import { SubscriptionPackage } from '../models/subscription-package';
import { getCurrencyAndValue, sanitizeString } from '../utils';
import { getDataFromUrl } from '../axios';

/**
 * Represents a web page scrapper that can be used to extract subscription package information from a page.
 */
export class Scrapper {
  private _page$?: CheerioAPI

  /**
   * Retrieves the HTML string for the specified URL using an HTTP GET request.
   *
   * @param url The URL of the page to retrieve.
   * @returns The HTML string for the specified URL.
   */
  static async getPageHtmlString(url: string): Promise<string> {
    return await getDataFromUrl(url) ?? ''
  }

  /**
   * Loads the specified HTML string into a CheerioAPI object and sets it as the current page.
   *
   * @param pageHtmlString The HTML string to load into the CheerioAPI object.
   * @returns The CheerioAPI object representing the loaded page.
   */
  loadPage(pageHtmlString: string = ''): CheerioAPI {
    this._page$ = load(pageHtmlString)
    return this._page$
  }

  /**
   * Extracts subscription package information from the current page and returns an array of SubscriptionPackage objects.
   *
   * @returns An array of SubscriptionPackage objects representing the subscription packages
   */
  subscriptionPackages(): SubscriptionPackage[] {
    if (!this._page$) return [];

    return (this._page$)('.package')
      .map((_, el) => {
        const currentPackage = (this._page$!)(el)

        const title = currentPackage.find('.header h3').text()
        const description = currentPackage.find('.package-description').text()
        const price = currentPackage.find('.package-price span').text()
        const discountInfo = currentPackage.find('.package-price p').text()
        const {valueWithCurrency} = getCurrencyAndValue(discountInfo)

        return new SubscriptionPackage(
          sanitizeString(title),
          sanitizeString(description),
          sanitizeString(price),
          valueWithCurrency
        )
      })
      .get()
  }

}