## Setup
Create a .env file in the root of this directory. Add the following:

 - ECDSA_SECRET='A Funded Private Key'
 - CONFIRMATION_TARGET='Target Number Of Confirmations'

Install Dependencies: 

 - `npm install`
 
Build The Project:
    
 - `npm run build`

## Create An Account 

 - `node lib/Main.js create-account <blockchain> <initial key count> <account name>`
 - Currently supported blockchains: `Mumbai (testnet)`, `Polygon`, `Gnosis`, and `Milkomeda`
 - The initial key count should be between 50 and 300 though values outside of this range may work
 - The account name is used to identify this account locally. It is not visable to other users

## Sign Message
 - `node lib/Main.js sign-message <message>`

## Add Keys
 - `node lib/Main.js add-keys <number of keys>`

## Select Account
 - `node lib/Main.js select-account <account name>`
 - This will set the account to be used for future commands until changed again 
 - Please note that creating a new account will automatically select it

## List Accounts
 - `node lib/Main.js list-accounts`

## Verify Message
 - `node lib/Main.js verify-message <message> <address> <blockchain>`

## Notice On Tokens
Don't sent tokens to your LambBedrock account. The account is not a wallet and you will not be able to recover funds sent to it.

## Notice On Key Count
- Don't run out of keys. You can always find your current key count by calling `liveKeyCount` on your account 
- Don't let your key count get to low. If you had only 1 key left and you planned to use it to post more keys you would have to be extremely careful. If your transaction failed or was never picked up you would have to consider that key unsafe to use. You may be able to resubmit the same transaction in some, but not all, cases. If resubmitting the transaction is not a safe option, the account should be considered unsafe to use

## Fees
Account creation is free aside from transaction fees. Pauli Group takes a fee upon posting new Lamport Keys to your contract. This fee is independent of the number of keys being posted and there is no explicit limitation on the number of keys which can be posted at once. There is no fee incured for posting the initial keys at the time of account creation. 

## Planned Features

### Encryption
 - Encrypt the account files with a password
 - AES should be fine for this purpose. AES is also quantum secure. 
 - Password should be a seperate prompt, not a command line argument or env variable. This will keep it out of the CLI history. 
 - We will have to hide the characters as they are typed

### Custom RPC overriding
- Allow the user to override the RPC endpoint for a blockchain using the .env file
### Check For And Remove Bad Keys
- Make sure every pkh listend in KeyTrackerB.expendedKeys is marked as `redeemed` on the contract

### Link To The Tx On The Chain Explorer When...
- Creating an account
- Adding keys
- Signing a message

### Locally Save Signed Messages
- Include the message and the transaction hash 
