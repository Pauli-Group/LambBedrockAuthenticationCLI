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
 - Currently supported blockchains: Mumbai (testnet), Polygon, Gnosis, and Milkomeda
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