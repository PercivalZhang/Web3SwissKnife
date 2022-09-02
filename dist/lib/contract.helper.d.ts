import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Account, TransactionReceipt } from "web3-core";
import { NetworkType } from "./web3.factory";
export declare class ContractHelper {
    web3: Web3;
    readonly address: string;
    private contract;
    private hideExceptionOutput;
    constructor(address: string, abiJSON: AbiItem[], network: NetworkType);
    setDefaultBlock(blockNumber: number): void;
    toggleHiddenExceptionOutput(): void;
    getBlockHeight(): Promise<number>;
    getCallData(methodName: string, ...args: any[]): any;
    callWriteMethod(signer: Account, methodName: string, gasPrice: string, value?: number, ...args: any[]): Promise<TransactionReceipt>;
    callReadMethodWithFrom(methodName: string, fromUser: string, ...args: any[]): Promise<any>;
    callReadMethod(methodName: string, ...args: any[]): Promise<any>;
    subscribeLogEvent(): void;
}
