import { Scrapper } from './scrapper';
import { SubscriptionPackage } from './models/subscription-package';

const scrapper = new Scrapper()

const websiteUrl = 'https://wltest.dns-systems.net/'

async function test(): Promise<void> {
  const websiteHtmlString = await Scrapper.getPageHtmlString(websiteUrl)
  await scrapper.loadPage(websiteHtmlString);
  const subscriptionPackages = scrapper.subscriptionPackages().sort(SubscriptionPackage.sortByPriceDesc)
  console.log(subscriptionPackages)
}

test()