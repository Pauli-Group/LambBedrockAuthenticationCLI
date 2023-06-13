import { ethers } from "ethers";
import LambBedrockAuthentication from "lambbedrockauthentication/lib/LambBedrockAuthentication";
import factoryOptions from "../../constants/factoryOptions";
import checkNicknamesAndHandleConflicts from "../checkNicknamesAndHandleConflicts";
import getCurrentState from "../getCurrentState";
import save from "../save";
import { selectAccountRaw } from "./selectAccount";
import isSupportedBlockchain from "../isSupportedBlockchain";
import "dotenv/config"

const createAccount = async (blockchain: string, numberOfKeys: number, nickname: string) => {
    const supportedChain = isSupportedBlockchain(blockchain);
    if (!supportedChain) {
        console.log(`The blockchain '${blockchain}' is not supported.`);
        process.exit(1);
    }

    const states: any = {}
    states.initial = await getCurrentState(process.env.ECDSA_SECRET!, factoryOptions[blockchain].rpc);

    const walletFactory = factoryOptions[blockchain].factoryAddress;
    const rpcEndpoint = factoryOptions[blockchain].rpc;

    const lba = new LambBedrockAuthentication(
        process.env.ECDSA_SECRET!,
        rpcEndpoint,
        walletFactory,
        parseInt(process.env.CONFIRMATION_TARGET!),
    );

    await checkNicknamesAndHandleConflicts(nickname);

    try {
        const [address, baseKeyTracker, transactionHash] = await lba.createAccount(numberOfKeys);

        // Save the account details to a file
        const filename = `accounts/${address}_${blockchain}_${Date.now()}_${nickname}.json`;
        const account = {
            address,
            baseKeyTracker,
            transactionHash,
            blockchain,
            nickname
        };
        save(filename, JSON.stringify(account, null, 2));

        states.after = await getCurrentState(process.env.ECDSA_SECRET!, factoryOptions[blockchain].rpc);

        const cost = BigInt(states.initial.balance) - BigInt(states.after.balance);

        console.table({
            'Created new account': address,
            'Blockchain': blockchain,
            'Number of keys': numberOfKeys,
            'Nickname': nickname,
            'Account details saved in file': filename,
            'Transaction hash': transactionHash,
            'Deployment cost': `${ethers.utils.formatEther(cost)} ETH`
        });

        // Select this account as the current account
        await selectAccountRaw(nickname);
    } catch (err: any) {
        console.error(`Error creating account: ${err.message}`);
    }
}

export default createAccount;