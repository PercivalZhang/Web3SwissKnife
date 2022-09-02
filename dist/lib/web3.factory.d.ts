import Web3 from 'web3';
export declare enum NetworkType {
    ETH_MAIN = 0,
    HECO = 1,
    HECO_TEST = 2,
    BSC = 3,
    POLYGON = 4,
    OKEXChain = 5,
    FANTOM = 6,
    CRONOS = 7,
    AVALANCHE = 8,
    ARBITRUM = 9,
    AURORA = 10
}
export declare type NetworkInfo = {
    chainId: number;
    rpcURI: number;
};
export declare class Web3Factory {
    private static instance;
    private constructor();
    static getInstance(): Web3Factory;
    getWeb3(network: NetworkType): Web3;
    getRPCURI(network: NetworkType): string;
    getChainId(network: NetworkType): number;
    getMultiCallAddress(network: NetworkType): string;
}
