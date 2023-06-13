import { promises as fs } from 'fs';
import KeyTrackerB from 'lambbedrockauthentication/lib/KeyTrackerB';
import LambBedrockAuthentication from 'lambbedrockauthentication/lib/LambBedrockAuthentication';
import factoryOptions from '../../constants/factoryOptions';
import "dotenv/config"
import say from '../say';

const addKeys = async (numberOfKeys: number) => {
    try {
        // Read and parse selected.json
        const selected = JSON.parse(await fs.readFile('accounts/selected.json', 'utf8'));
        const selectedAccountFile = selected.current_account_file;

        // Read and parse the selected account
        const selectedAccountContent = await fs.readFile(selectedAccountFile, 'utf8');
        const selectedAccount = JSON.parse(selectedAccountContent);

        // Create a new LambBedrockAuthentication instance with the selected account
        const lba = new LambBedrockAuthentication(
            process.env.ECDSA_SECRET!,
            factoryOptions[selectedAccount.blockchain].rpc,
            factoryOptions[selectedAccount.blockchain].factoryAddress,
            parseInt(process.env.CONFIRMATION_TARGET!), 
        );

        const keyTracker = new KeyTrackerB();
        keyTracker.keys = selectedAccount.baseKeyTracker.keys;

        // Add keys to the account
        const [gasUsed, keyCount, remainingOnContract, sanityCheck, txHash] = await lba.addKeys(
            selectedAccount.address,
            keyTracker,
            numberOfKeys,
        );

        // Update the account's key count and save

        await fs.writeFile(selectedAccountFile, JSON.stringify(selectedAccount, null, 2));

        console.log(`${numberOfKeys} keys added to the account '${selectedAccount.nickname}'.`);
        // console.log(`Gas used: ${gasUsed}`);
        say('Gas', gasUsed.toString());
        // console.log(`Total keys in the account: ${keyCount}`);
        say('Keys', keyCount.toString());
        say('Tx', `${factoryOptions[selectedAccount.blockchain].baseExplorer}tx/${txHash}`);

    } catch (error: any) {
        console.log(`Failed to add keys to the account: ${error.message}`);
    }
}


export default addKeys;