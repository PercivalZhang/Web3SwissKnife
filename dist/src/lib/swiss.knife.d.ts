import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import BigNumber from "bignumber.js";
import { JSONDBBuilder } from "./db.json";
import { NetworkType } from "./web3.factory";
import { ERC20Token } from "./erc20.token";
export declare enum EVMDataType {
    STRING = 0,
    UINT256 = 1,
    ADDRESS = 2
}
export interface LPToken {
    token0: ERC20Token;
    token1: ERC20Token;
    reserve0: BigNumber;
    reserve1: BigNumber;
    totalSupply: BigNumber;
}
export declare class SwissKnife {
    protected readonly web3: Web3;
    protected tokenDB: JSONDBBuilder;
    constructor(network: NetworkType);
    getProxyAdminAddress(proxyAddress: string): Promise<string>;
    decode(pType: EVMDataType, hex: string): {
        [key: string]: any;
    };
    decodeArray(typesArray: Array<String | Object>, hex: string): {
        [key: string]: any;
    };
    syncUpTokenDB(tokenAddress: string, contract?: Contract): Promise<ERC20Token>;
    isPairedLPToken(address: string): Promise<boolean>;
    getERC20TokenBalance(erc20TokenAddress: string, userAddress: string): Promise<number>;
    getPairedLPTokenDetails(address: string): Promise<LPToken>;
    getWeb3(): Web3;
    getBlockHeight(): Promise<number>;
    getBlockTimestamp(blockNumber: string): Promise<string | number>;
    getLatestBlockTimestamp(): Promise<string | number>;
}
