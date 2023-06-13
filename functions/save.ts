import { promises as fs } from 'fs';
import path from 'path';

export default async function save(filepath: string, content: string) {
    // if /accounts/ doesn't exist, create it

    const dir = path.dirname(filepath);
    try {
        await fs.access(dir);
    } catch (error) {
        await fs.mkdir(dir, { recursive: true });
    }

    // Write the content to the file
    try {
        await fs.writeFile(filepath, content);
        console.log(`Data saved to ${filepath}`);
    } catch (error) {
        console.error(`Error writing file: ${error}`);
    }
}