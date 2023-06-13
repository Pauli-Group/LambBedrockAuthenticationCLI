import { ethers } from 'ethers';

const getCurrentState = async (secret: string, rpcEndpoint: string): Promise<any> => {
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
    const caller: ethers.Wallet = (new ethers.Wallet(secret)).connect(provider);

    return {
        balance: await provider.getBalance(caller.address),
    }
}

export default getCurrentState;