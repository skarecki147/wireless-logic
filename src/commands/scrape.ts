import type { Arguments, CommandBuilder } from 'yargs';
import { Scrapper } from '../scrapper';
import { getDataFromUrl } from '../axios';
import { SubscriptionPackage } from '../models/subscription-package';

type Options = {
  url: string;
};

export const command = 'scrape <url>';
export const desc = 'Scrape <url> and return list of subscription packages';

export const builder: CommandBuilder<Options, Options> = (yargs: any) =>
  yargs
    .positional('url', {type: 'string', demandOption: true});

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const {url} = argv;
  const scraper = new Scrapper()

  const pageHtmlString = await getDataFromUrl(url) ?? ''
  scraper.loadPage(pageHtmlString)
  const res = scraper.subscriptionPackages().sort(SubscriptionPackage.sortByPriceDesc)

  process.stdout.write(JSON.stringify(res));
  process.exit(0);
};