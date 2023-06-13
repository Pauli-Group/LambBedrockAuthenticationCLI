import { Command } from 'commander'
import selectAccount from './functions/actions/selectAccount';
import createAccount from './functions/actions/createAccount';
import listAccounts from './functions/actions/listAccounts';
import "dotenv/config"
import signMessage from './functions/actions/signMessage';
import verifyMessage from './functions/actions/verifyMessage';
import addKeys from './functions/actions/addKeys';

const program = new Command();

program
    .name('Lamport Bedrock Authentication Command Line Interface')
    .description('A command line interface for authenticating messages using the Lamport Bedrock Authentication protocol.')
    .version('0.0.1')

program
    .command('create-account')
    .description('Create a new account')
    .argument('<string>', 'The name of the blockchain to use')
    .argument('<number>', 'The number of keys to initially generate')
    .argument('<string>', 'The name of the account (used locally to identify your account)')
    .action(createAccount)

program
    .command('select-account')
    .description('Select an existing account by its nickname')
    .argument('<string>', 'The nickname of the account to select')
    .action(selectAccount);

program
    .command('list-accounts')
    .description('List all accounts')
    .action(listAccounts);

program
    .command('sign-message')
    .description('Sign a message and publish it to the blockchain')
    .argument('<string>', 'The message to sign')
    .action(signMessage);

program
    .command('verify-message')
    .description('Verify a message')
    .argument('<string>', 'The message to verify')
    .argument('<string>', 'The address of the account that signed the message')
    .argument('<string>', 'The blockchain the message was signed on')
    .action(verifyMessage);

program
    .command('add-keys')
    .description('Add keys to an account')
    .argument('<number>', 'The number of keys to add')
    .action(addKeys);

program.parse()