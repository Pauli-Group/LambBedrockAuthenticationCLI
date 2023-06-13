import { promises as fs } from 'fs';
import path from 'path';

export async function selectAccountRaw(nickname: string) {
    const accountsDirectory = 'accounts';
    const selectedFile = 'accounts/selected.json';
    let filenames;

    // Read accounts directory
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

    // Find account with the given nickname
    const accountFilename = filenames.find(filename => {
        const match = filename.match(/.*_\d+_(.*)\.json$/);
        return match && match[1] === nickname;
    });

    if (!accountFilename) {
        console.log(`No account found with the nickname '${nickname}'.`);
        return;
    }

    // Update selected account file
    const selected = { current_account_file: path.join(accountsDirectory, accountFilename) };
    await fs.writeFile(selectedFile, JSON.stringify(selected, null, 2));

    console.log(`Selected account '${nickname}'.`);
}

const selectAccount = async (nickname: string) => {
    try {
        await selectAccountRaw(nickname);
    } catch (error: any) {
        console.log(`Failed to select the account with nickname '${nickname}': ${error.message}`);
    }
}

export default selectAccount;