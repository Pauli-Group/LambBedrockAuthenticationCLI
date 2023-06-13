import { FactroryOption } from "../types/FactoryOption";

// mapping from string to factory options
const factoryOptions: Record<string, FactroryOption> = {
    'mumbai': {
        'baseExplorer': 'https://mumbai.polygonscan.com/',
        'rpc': 'https://endpoints.omniatech.io/v1/matic/mumbai/public',
        'factoryAddress': '0x99280358eA9f0cA197C713a048147F407a5da553',
    },
    'polygon': {
        'baseExplorer': 'https://polygonscan.com/',
        'rpc': 'https://polygon.llamarpc.com',
        'factoryAddress': '0xfffFdA9A3a4f1FE8EAb0376A7e6360b1023A2383',
    },
    'gnosis': {
        'baseExplorer': 'https://gnosisscan.io/',
        'rpc': 'https://gnosis.api.onfinality.io/public',
        'factoryAddress': '0xfffFdA9A3a4f1FE8EAb0376A7e6360b1023A2383',
    },
    'milkomeda': {
        'baseExplorer': 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com/',
        'rpc': 'https://rpc-mainnet-cardano-evm.c1.milkomeda.com',
        'factoryAddress': '0xfffFdA9A3a4f1FE8EAb0376A7e6360b1023A2383',
    },
}

export default factoryOptions;