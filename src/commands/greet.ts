import type { Arguments, CommandBuilder } from 'yargs';
import { sayHello } from '../hello/hello';

type Options = {
  name: string;
};

export const command: string = 'greet <name>';
export const desc: string = 'Greet <name> with Hello';

export const builder: CommandBuilder<Options, Options> = (yargs: any) =>
  yargs
    .positional('name', { type: 'string', demandOption: true });

export const handler = (argv: Arguments<Options>): void => {
  const { name } = argv;
  const greeting = sayHello(name)
  process.stdout.write(greeting);
  process.exit(0);
};