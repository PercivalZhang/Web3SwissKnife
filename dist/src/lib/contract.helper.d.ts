import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Account, TransactionReceipt } from "web3-core";
import { NetworkType } from "./web3.factory";
export declare class ContractHelper {
    web3: Web3;
    readonly address: string;
    private contract;
    private hideExceptionOutput;
    constructor(address: string, abiFileName: string, network: NetworkType);
    static getContractInstanceFromABI(address: string, abiJSONString: string, network: NetworkType): Contract;
    setDefaultBlock(blockNumber: number): void;
    toggleHiddenExceptionOutput(): void;
    getBlockHeight(): Promise<number>;
    getCallData(methodName: string, ...args: any[]): any;
    callWriteMethod(signer: Account, methodName: string, gasPrice: string, value?: number, ...args: any[]): Promise<TransactionReceipt>;
    callReadMethodWithFrom(methodName: string, fromUser: string, ...args: any[]): Promise<any>;
    callReadMethod(methodName: string, ...args: any[]): Promise<any>;
    subscribeLogEvent(): void;
}
