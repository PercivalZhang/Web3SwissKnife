"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapRouter = void 0;
const contract_helper_1 = require("./contract.helper");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const swiss_knife_1 = require("./swiss.knife");
const router_json_1 = __importDefault(require("../abi/router.json"));
class SwapRouter {
    constructor(address, network, abiJSON = router_json_1.default) {
        this.methodMap = new Map();
        this.router = new contract_helper_1.ContractHelper(address, abiJSON, network);
        this.swissknife = new swiss_knife_1.SwissKnife(network);
        this.methodMap.set("getAmountsOut", "getAmountsOut");
    }
    async getAmountsOut(inputTokenAddress, inputTokenDecimalAmount, paths) {
        try {
            if (paths.length < 2)
                return -1;
            const inputToken = await this.swissknife.syncUpTokenDB(inputTokenAddress);
            const inputTokenAmount = new bignumber_js_1.default(inputTokenDecimalAmount).multipliedBy(Math.pow(10, inputToken.decimals));
            const amountsOutData = await this.router.callReadMethod(this.methodMap.get("getAmountsOut"), inputTokenAmount, paths);
            const outputToken = await this.swissknife.syncUpTokenDB(paths[paths.length - 1]);
            return outputToken.readableAmount(amountsOutData[1]);
        }
        catch (e) {
            console.error(e.message);
            return -1;
        }
    }
    setMethodMap(methodName, methodNameOfContract) {
        this.methodMap.set(methodName, methodNameOfContract);
    }
    setMethodNameOfGetAmountsOut(methodNameOfContract) {
        this.methodMap.set("getAmountsOut", methodNameOfContract);
    }
}
exports.SwapRouter = SwapRouter;
//# sourceMappingURL=swap.router.js.map