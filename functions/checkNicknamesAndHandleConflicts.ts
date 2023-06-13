import { promises as fs } from 'fs';

export default async function checkNicknamesAndHandleConflicts(nickname: string) {
    const accountsDirectory = 'accounts';
    let filenames;

    // Read directory
    try {
        filenames = await fs.readdir(accountsDirectory);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            // If the accounts directory does not exist yet, that's not a problem
            return;
        } else {
            throw error;
        }
    }

    // Extract nicknames from filenames
    const nicknames = filenames.map(filename => {
        const match = filename.match(/.*_\d+_(.*)\.json$/);
        return match ? match[1] : null;
    });

    const setOfNicknames = new Set(nicknames);
    if (setOfNicknames.size !== nicknames.length) {
        console.error('There are duplicate nicknames in the accounts directory. Please resolve this manually.');
        process.exit(1);
    }

    // Check for duplicate nicknames
    if (nicknames.includes(nickname)) {
        console.error(`The nickname '${nickname}' is already in use. Please choose a different nickname.`);
        process.exit(1);
    }
}