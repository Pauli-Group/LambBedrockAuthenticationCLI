import { promises as fs } from 'fs';
import path from 'path';
import { DisplayAccount } from '../../types/Account';

const listAccounts = async () => {
    const accountsDirectory = 'accounts';
    const selectedFile = 'accounts/selected.json';
    let filenames;

    // Read directory
    try {
        filenames = await fs.readdir(accountsDirectory);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            // If the accounts directory does not exist yet, that's not a problem
            console.log("No accounts exist yet.");
            return;
        } else {
            throw error;
        }
    }

    // Read and parse selected.json
    let selectedAccountFile;
    try {
        const selected = JSON.parse(await fs.readFile(selectedFile, 'utf8'));
        selectedAccountFile = selected.current_account_file;
    } catch (error: any) {
        // If the selected.json file does not exist yet or is not valid JSON, that's not a problem
    }

    // Read and parse account files
    const accounts: DisplayAccount[] = [];
    for (const filename of filenames) {
        if (filename === "selected.json") continue; // Skip the selected.json file

        const filepath = path.join(accountsDirectory, filename);
        const fileContent = await fs.readFile(filepath, 'utf8');
        const obj = JSON.parse(fileContent);
        const account: DisplayAccount = JSON.parse(JSON.stringify(obj));
        account.numberOfLiveKeys = obj.baseKeyTracker.keys.length;
        account.isSelected = filepath === selectedAccountFile;
        accounts.push(account);
    }

    // Prepare accounts for display
    const displayAccounts = accounts.map(account => ({
        nickname: account.nickname,
        blockchain: account.blockchain,
        address: account.address,
        localKeyCount: account.numberOfLiveKeys,
        isSelected: account.isSelected ? 'Yes' : 'No',
    }));

    // Output accounts
    console.table(displayAccounts);
}

export default listAccounts;