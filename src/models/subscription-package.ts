import { getCurrencyAndValue } from '../utils';

/**
 * Class that represents Product Subscription Package Model
 */
export class SubscriptionPackage {
  title: string;
  description: string;
  price: string;
  discount?: string | null;

  constructor(title: string, description: string, price: string, discount?: string | null) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.discount = discount;
  }

  /**
   * SubscriptionPackage comparator - descending by price
   * @param a - instance of SubscriptionPackage
   * @param b- instance of SubscriptionPackage
   */
  static sortByPriceDesc = (a: SubscriptionPackage, b: SubscriptionPackage) => {
    let {value: priceA} = getCurrencyAndValue(a.price)
    let {value: priceB} = getCurrencyAndValue(b.price)

    priceA ??= 0;
    priceB ??= 0;

    if (priceA > priceB) {
      return -1;
    } else if (priceA < priceB) {
      return 1;
    } else {
      return 0;
    }
  }
}