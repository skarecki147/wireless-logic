import { SubscriptionPackage } from '../models/subscription-package';
import { Scrapper } from './scrapper';

describe('Scrapper', () => {
  const mockGetDataFromUrl = jest.fn(() => `
      <div class="package">
        <div class="header"><h3>Product 1</h3></div>
        <div class="package-description">Description of product 1</div>
        <div class="package-price">$19.99</div>
      </div>
      <div class="package">
        <div class="header"><h3>Product 2</h3></div>
        <div class="package-description">Description of product 2</div>
        <div class="package-price">$29.99</div>
      </div>`
  )

  let scrapper: Scrapper;

  beforeAll(() => {
    scrapper = new Scrapper()
  })

  it('should return a list of ProductModel objects from valid HTML data',  () => {
    const data = `
      <div class="package">
        <div class="header"><h3>Product 1</h3></div>
        <div class="package-description">Description of product 1</div>
        <div class="package-price"><span>$19.99</span></div>
      </div>
      <div class="package">
        <div class="header"><h3>Product 2</h3></div>
        <div class="package-description">Description of product 2</div>
        <div class="package-price"><span>$29.99</span></div>
      </div>
      <div class="package">
        <div class="header"><h3>Product 3</h3></div>
        <div class="package-description">Description of product 3</div>
        <div class="package-price"><span>$39.99</span><p>$29.99</p></div>
      </div>
    `
    scrapper.loadPage(data)
    const result = scrapper.subscriptionPackages()

    expect(result).toHaveLength(3)
    expect(result[0]).toBeInstanceOf(SubscriptionPackage)
    expect(result[1]).toBeInstanceOf(SubscriptionPackage)
    expect(result[2]).toBeInstanceOf(SubscriptionPackage)

    expect(result[0].title).toBe('Product 1')
    expect(result[0].description).toBe('Description of product 1')
    expect(result[0].price).toBe('$19.99')
    expect(result[0].discount).toBe(null)

    expect(result[1].title).toBe('Product 2')
    expect(result[1].description).toBe('Description of product 2')
    expect(result[1].price).toBe('$29.99')
    expect(result[1].discount).toBe(null)

    expect(result[2].title).toBe('Product 3')
    expect(result[2].description).toBe('Description of product 3')
    expect(result[2].price).toBe('$39.99')
    expect(result[2].discount).toBe('$29.99')
  })

  it('should return an empty array if no packages are found in the HTML data',  () => {
    const data = ''

    scrapper.loadPage(data)
    const result = scrapper.subscriptionPackages()

    expect(result).toHaveLength(0)
  })
})
