"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Factory = exports.NetworkType = void 0;
const web3_1 = __importDefault(require("web3"));
var NetworkType;
(function (NetworkType) {
    NetworkType[NetworkType["ETH_MAIN"] = 0] = "ETH_MAIN";
    NetworkType[NetworkType["HECO"] = 1] = "HECO";
    NetworkType[NetworkType["HECO_TEST"] = 2] = "HECO_TEST";
    NetworkType[NetworkType["BSC"] = 3] = "BSC";
    NetworkType[NetworkType["POLYGON"] = 4] = "POLYGON";
    NetworkType[NetworkType["OKEXChain"] = 5] = "OKEXChain";
    NetworkType[NetworkType["FANTOM"] = 6] = "FANTOM";
    NetworkType[NetworkType["CRONOS"] = 7] = "CRONOS";
    NetworkType[NetworkType["AVALANCHE"] = 8] = "AVALANCHE";
    NetworkType[NetworkType["ARBITRUM"] = 9] = "ARBITRUM";
    NetworkType[NetworkType["AURORA"] = 10] = "AURORA";
})(NetworkType = exports.NetworkType || (exports.NetworkType = {}));
const Chains = {
    0: {
        rpcURI: 'https://mainnet.infura.io/v3/11ae2b7ff4c04391b71dd5a196c21b0d',
        blockDelta: 12.5,
        multicall: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441'
    },
    1: {
        rpcURI: 'https://http-mainnet-node.huobichain.com',
        blockDelta: 12.5,
    },
    3: {
        rpcURI: 'https://bscrpc.com',
        blockDelta: 3,
    },
    4: {
        rpcURI: 'https://polygon-rpc.com',
        blockDelta: 2,
    },
    6: {
        rpcURI: 'https://rpc.fantom.network',
    },
    7: {
        rpcURI: 'https://rpc.vvs.finance',
    },
    8: {
        rpcURI: 'https://api.avax.network/ext/bc/C/rpc',
    },
    9: {
        chainId: 42161,
        rpcURI: 'https://arb1.arbitrum.io/rpc',
        blockDelta: 12.5,
    },
    10: {
        chainId: 1313161554,
        rpcURI: 'https://mainnet.aurora.dev',
    },
};
class Web3Factory {
    constructor() { }
    static getInstance() {
        if (!Web3Factory.instance) {
            Web3Factory.instance = new Web3Factory();
        }
        return Web3Factory.instance;
    }
    getWeb3(network) {
        return new web3_1.default(Chains[network].rpcURI);
    }
    getRPCURI(network) {
        return Chains[network].rpcURI;
    }
    getChainId(network) {
        return Chains[network].chainId;
    }
    getMultiCallAddress(network) {
        return Chains[network].multicall;
    }
}
exports.Web3Factory = Web3Factory;
//# sourceMappingURL=web3.factory.js.map