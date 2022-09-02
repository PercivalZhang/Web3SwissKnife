"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20Token = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class ERC20Token {
    constructor(address, symbol, decimals) {
        this.address = address;
        this.symbol = symbol;
        this.decimals = decimals;
    }
    readableAmount(amount) {
        const bgAmount = new bignumber_js_1.default(amount);
        return bgAmount.dividedBy(Math.pow(10, this.decimals)).toNumber();
    }
    readableAmountFromBN(amount) {
        return amount.dividedBy(Math.pow(10, this.decimals)).toNumber();
    }
}
exports.ERC20Token = ERC20Token;
//# sourceMappingURL=erc20.token.js.map