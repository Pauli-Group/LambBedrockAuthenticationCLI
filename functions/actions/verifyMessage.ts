import LambBedrockAuthentication from "lambbedrockauthentication/lib/LambBedrockAuthentication";
import factoryOptions from "../../constants/factoryOptions";
import "dotenv/config"

const verifyMessage = async (message: string, address: string, blockchain: string) => {
    const lba = new LambBedrockAuthentication(
        process.env.ECDSA_SECRET!,
        factoryOptions[blockchain].rpc,
        factoryOptions[blockchain].factoryAddress,
        parseInt(process.env.CONFIRMATION_TARGET!),
    );

    const [isValid] = await lba.verifyMessage(address, message);
    if (isValid) {
        console.log(`The message '${message}' was signed by the account with address '${address}'.`);
        return
    }
    console.log('INVALID')
}

export default verifyMessage;