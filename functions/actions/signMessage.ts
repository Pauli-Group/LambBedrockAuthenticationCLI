import { promises as fs } from 'fs';
import KeyTrackerB from 'lambbedrockauthentication/lib/KeyTrackerB';
import LambBedrockAuthentication from 'lambbedrockauthentication/lib/LambBedrockAuthentication';
import factoryOptions from '../../constants/factoryOptions';
import say from '../say';
import "dotenv/config"

const signMessage = async (message: string) => {
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

        say('message', message)
        say('signer address', selectedAccount.address)

        const keyTracker = new KeyTrackerB();
        keyTracker.keys = selectedAccount.baseKeyTracker.keys;

        say('Key Count', keyTracker.keys.length)

        // Sign the message and post the signature
        const [
            _msgHash,
            _remainingKeysLocal,
            _remainingKeysRemote,
            _sanity,
            transactionHash
        ] = await lba.signMessageAndPostSignature(
            message,
            selectedAccount.address,
            keyTracker
        );

        await fs.writeFile(selectedAccountFile, JSON.stringify({
            ...selectedAccount,
            baseKeyTracker: keyTracker,
        }, null, 2));

        say('Tx Hash', transactionHash)
        say('Tx', `${factoryOptions[selectedAccount.blockchain].baseExplorer}tx/${transactionHash}`)

    } catch (error: any) {
        console.log(`Failed to sign and publish the message '${message}': ${error.message}`);
    }
}

export default signMessage;