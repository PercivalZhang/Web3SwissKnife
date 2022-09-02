import { AbiItem } from "web3-utils";
import { NetworkType } from "./web3.factory";
export declare class SwapRouter {
    private swissknife;
    private methodMap;
    private router;
    constructor(address: string, network: NetworkType, abiJSON?: AbiItem[]);
    getAmountsOut(inputTokenAddress: string, inputTokenDecimalAmount: number, paths: string[]): Promise<number>;
    setMethodMap(methodName: string, methodNameOfContract: string): void;
    setMethodNameOfGetAmountsOut(methodNameOfContract: string): void;
}
