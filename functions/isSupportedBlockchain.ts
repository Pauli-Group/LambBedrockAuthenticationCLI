import factoryOptions from "../constants/factoryOptions";

const isSupportedBlockchain = (blockchain: string) => {
    return Object.keys(factoryOptions).includes(blockchain);
}

export default isSupportedBlockchain;