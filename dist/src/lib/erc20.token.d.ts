import BigNumber from 'bignumber.js';
export declare class ERC20Token {
    address: string;
    symbol: string;
    decimals: number;
    id: string;
    name: string;
    constructor(address: string, symbol: string, decimals: number);
    readableAmount(amount: string): number;
    readableAmountFromBN(amount: BigNumber): number;
}
