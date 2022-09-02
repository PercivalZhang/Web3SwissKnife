"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwissKnife = exports.EVMDataType = void 0;
const path = __importStar(require("path"));
const web3_1 = __importDefault(require("web3"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const LoggerFactory_1 = require("./LoggerFactory");
const db_json_1 = require("./db.json");
const web3_factory_1 = require("./web3.factory");
const erc20_token_1 = require("./erc20.token");
const lp_pair_json_1 = __importDefault(require("../abi/lp.pair.json"));
const erc20_json_1 = __importDefault(require("../abi/erc20.json"));
const erc20_1_json_1 = __importDefault(require("../abi/erc20.1.json"));
const logger = LoggerFactory_1.LoggerFactory.getInstance().getLogger("SwissKnife");
var EVMDataType;
(function (EVMDataType) {
    EVMDataType[EVMDataType["STRING"] = 0] = "STRING";
    EVMDataType[EVMDataType["UINT256"] = 1] = "UINT256";
    EVMDataType[EVMDataType["ADDRESS"] = 2] = "ADDRESS";
})(EVMDataType = exports.EVMDataType || (exports.EVMDataType = {}));
class SwissKnife {
    constructor(network) {
        this.web3 = web3_factory_1.Web3Factory.getInstance().getWeb3(network);
        this.tokenDB = new db_json_1.JSONDBBuilder(path.resolve("db/token.db"), true, true, "/");
    }
    async getProxyAdminAddress(proxyAddress) {
        const proxyAdminAddress = await this.web3.eth.getStorageAt(proxyAddress, "0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103");
        return proxyAdminAddress;
    }
    decode(pType, hex) {
        switch (pType) {
            case EVMDataType.STRING:
                return this.web3.eth.abi.decodeParameter("string", hex);
            case EVMDataType.UINT256:
                return this.web3.eth.abi.decodeParameter("uint256", hex);
            case EVMDataType.ADDRESS:
                return this.web3.eth.abi.decodeParameter("address", hex);
        }
    }
    decodeArray(typesArray, hex) {
        return this.web3.eth.abi.decodeParameters(typesArray, hex);
    }
    async syncUpTokenDB(tokenAddress, contract) {
        logger.debug(`syncUpTokenDB(${tokenAddress})`);
        let tokenContract = contract;
        try {
            const chainId = await this.web3.eth.net.getId();
            logger.debug(`chain id: ${chainId}`);
            const token = await this.tokenDB.getData("/" + chainId + "/" + tokenAddress.toLowerCase());
            if (!token) {
                if (tokenAddress.toLowerCase() ===
                    "0x0000000000000000000000000000000000000000") {
                    switch (chainId) {
                        case 137:
                            this.tokenDB.push("/" + chainId + "/" + tokenAddress.toLowerCase(), {
                                symbol: "MATIC",
                                decimals: 18,
                            });
                            break;
                    }
                }
                else if (tokenAddress.toLowerCase() ===
                    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
                    switch (chainId) {
                        case 1:
                            this.tokenDB.push("/" + chainId + "/" + tokenAddress.toLowerCase(), {
                                symbol: "ETH",
                                decimals: 18,
                            });
                            break;
                    }
                }
                else {
                    if (!tokenContract) {
                        logger.debug(`no contract provided`);
                        logger.debug(`loading contract by token address: ${tokenAddress}`);
                        try {
                            tokenContract = new this.web3.eth.Contract(erc20_json_1.default, tokenAddress);
                            await tokenContract.methods.symbol().call();
                        }
                        catch (e) {
                            logger.warn(`detected non-standard erc20 token, try loading erc20.1 ABI...`);
                            tokenContract = new this.web3.eth.Contract(erc20_1_json_1.default, tokenAddress);
                        }
                    }
                    let symbol = await tokenContract.methods.symbol().call();
                    symbol = symbol.replace(/0+$/, "");
                    if (symbol.substr(0, 2) === "0x") {
                        symbol = web3_1.default.utils.toAscii(symbol);
                    }
                    const decimals = Number.parseInt(await tokenContract.methods.decimals().call());
                    logger.debug(`add new token - ${symbol} into local token db at ${tokenAddress}`);
                    this.tokenDB.push("/" + chainId + "/" + tokenAddress.toLowerCase(), {
                        symbol: symbol,
                        decimals: decimals,
                    });
                }
                const newToken = await this.tokenDB.getData("/" + chainId + "/" + tokenAddress.toLowerCase());
                newToken["address"] = tokenAddress;
                const erc20Token = new erc20_token_1.ERC20Token(newToken["address"], newToken["symbol"], newToken["decimals"]);
                return erc20Token;
            }
            token["address"] = tokenAddress;
            const erc20Token = new erc20_token_1.ERC20Token(token["address"], token["symbol"], token["decimals"]);
            return erc20Token;
        }
        catch (e) {
            logger.error("upper catch errors.....");
            logger.error(`syncUpTokenDB(${tokenAddress}) > ${e.toString()}`);
        }
    }
    async isPairedLPToken(address) {
        try {
            const lpContract = new this.web3.eth.Contract(lp_pair_json_1.default, address);
            await lpContract.methods.token0().call();
            return true;
        }
        catch (e) {
            logger.warn(e.message);
            return false;
        }
    }
    async getERC20TokenBalance(erc20TokenAddress, userAddress) {
        const token = await this.syncUpTokenDB(erc20TokenAddress);
        const erc20 = new this.web3.eth.Contract(erc20_json_1.default, erc20TokenAddress);
        const balance = await erc20.methods.balanceOf(userAddress).call();
        return token.readableAmount(balance);
    }
    async getPairedLPTokenDetails(address) {
        try {
            const lpContract = new this.web3.eth.Contract(lp_pair_json_1.default, address);
            const token0Address = await lpContract.methods.token0().call();
            const token1Address = await lpContract.methods.token1().call();
            const token0 = await this.syncUpTokenDB(token0Address);
            const token1 = await this.syncUpTokenDB(token1Address);
            const reserves = await lpContract.methods.getReserves().call();
            const totalSupply = await lpContract.methods.totalSupply().call();
            const lpt = {
                token0,
                token1,
                reserve0: new bignumber_js_1.default(reserves[0]),
                reserve1: new bignumber_js_1.default(reserves[1]),
                totalSupply: new bignumber_js_1.default(totalSupply),
            };
            return lpt;
        }
        catch (e) {
            logger.error(`getLPTokenDetails > ${e.toString()}`);
        }
    }
    getWeb3() {
        return this.web3;
    }
    async getBlockHeight() {
        return await this.web3.eth.getBlockNumber();
    }
    async getBlockTimestamp(blockNumber) {
        const block = await this.web3.eth.getBlock(blockNumber);
        return block.timestamp;
    }
    async getLatestBlockTimestamp() {
        const blockHeight = await this.web3.eth.getBlockNumber();
        const block = await this.web3.eth.getBlock(blockHeight);
        return block.timestamp;
    }
}
exports.SwissKnife = SwissKnife;
//# sourceMappingURL=swiss.knife.js.map