import BigNumber from 'bignumber.js';
export class ERC20Token {
    public address: string;
    public symbol: string;
    public decimals: number;
    id: string;
    name: string;

    public constructor(address: string, symbol: string, decimals: number) {
        this.address = address;
        this.symbol = symbol;
        this.decimals = decimals;
    }
    public readableAmount(amount: string): number {
        const bgAmount = new BigNumber(amount);
        return bgAmount.dividedBy(Math.pow(10, this.decimals)).toNumber();
    }
    public readableAmountFromBN(amount: BigNumber): number {
        return amount.dividedBy(Math.pow(10, this.decimals)).toNumber();
    }
}
