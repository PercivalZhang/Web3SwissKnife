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
exports.ContractHelper = void 0;
const LoggerFactory_1 = require("./LoggerFactory");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const web3_factory_1 = require("./web3.factory");
const logger = LoggerFactory_1.LoggerFactory.getInstance().getLogger("ContractHelper");
const MaxGas = 700000;
class ContractHelper {
    constructor(address, abiFileName, network) {
        this.address = address;
        this.web3 = web3_factory_1.Web3Factory.getInstance().getWeb3(network);
        const pathABIFile = path.resolve("abi", abiFileName);
        const apiInterfaceContract = JSON.parse(fs_1.default.readFileSync(pathABIFile).toString());
        this.contract = new this.web3.eth.Contract(apiInterfaceContract, address);
        this.hideExceptionOutput = false;
    }
    static getContractInstanceFromABI(address, abiJSONString, network) {
        const apiInterfaceContract = JSON.parse(abiJSONString);
        const web3 = web3_factory_1.Web3Factory.getInstance().getWeb3(network);
        return new web3.eth.Contract(apiInterfaceContract, address);
    }
    setDefaultBlock(blockNumber) {
        this.contract.defaultBlock = blockNumber;
    }
    toggleHiddenExceptionOutput() {
        this.hideExceptionOutput = !this.hideExceptionOutput;
    }
    async getBlockHeight() {
        return this.web3.eth.getBlockNumber();
    }
    getCallData(methodName, ...args) {
        return this.contract.methods[methodName](...args).encodeABI();
    }
    async callWriteMethod(signer, methodName, gasPrice, value = 0, ...args) {
        try {
            logger.info(`callWriteMethod > ${methodName} : ${args}`);
            logger.info(`callWriteMethod > value : ${value}`);
            logger.debug(`callWriteMethod > input gas price: ${gasPrice} gwei`);
            const currentGasPrice = await this.web3.eth.getGasPrice();
            logger.info(`callWriteMethod > current gas price: ${currentGasPrice} wei`);
            const currentGasPriceBN = new bignumber_js_1.default(currentGasPrice);
            gasPrice = this.web3.utils.toWei(gasPrice, "gwei");
            logger.debug(`callWriteMethod > input gas price: ${gasPrice} wei`);
            const inputGasPriceBN = new bignumber_js_1.default(gasPrice);
            if (inputGasPriceBN.lte(currentGasPriceBN))
                gasPrice = currentGasPrice;
            logger.info(`callWriteMethod > gas price: ${gasPrice} wei`);
            const nonce = await this.web3.eth.getTransactionCount(signer.address);
            const callData = this.contract.methods[methodName](...args).encodeABI();
            const unsignedTX = {
                nonce,
                gas: this.web3.utils.toHex(MaxGas),
                gasPrice: this.web3.utils.toHex(gasPrice),
                from: signer.address,
                to: this.address,
                value: this.web3.utils.toHex(value),
                data: callData,
            };
            logger.info(`sign and broadcast...`);
            const signedTX = await signer.signTransaction(unsignedTX);
            const txReceipt = await this.web3.eth.sendSignedTransaction(signedTX.rawTransaction);
            logger.info(`callWriteMethod > ${txReceipt.transactionHash}`);
            return txReceipt;
        }
        catch (e) {
            if (!this.hideExceptionOutput) {
                logger.error(`callWriteMethod> ${e.message}`);
            }
        }
    }
    async callReadMethodWithFrom(methodName, fromUser, ...args) {
        try {
            logger.debug(`call method - ${methodName} : ${args}`);
            const ret = await this.contract.methods[methodName](...args).call({
                from: fromUser,
            });
            logger.debug(`callReadMethod > ${JSON.stringify(ret)}`);
            return ret;
        }
        catch (e) {
            if (!this.hideExceptionOutput) {
                logger.error(`methodName: ${methodName}`);
                logger.error(`callReadMethod> ${e.message}`);
            }
            return false;
        }
    }
    async callReadMethod(methodName, ...args) {
        try {
            logger.debug(`call method - ${methodName} : ${args}`);
            const ret = await this.contract.methods[methodName](...args).call();
            logger.debug(`callReadMethod > ${JSON.stringify(ret)}`);
            return ret;
        }
        catch (e) {
            if (!this.hideExceptionOutput) {
                logger.error(`methodName: ${methodName}`);
                logger.error(`callReadMethod> ${e.message}`);
            }
            return false;
        }
    }
    subscribeLogEvent() {
        this.contract
            .getPastEvents("TransferReward", {
            fromBlock: 5101060,
            toBlock: "latest",
        }, function (error, events) {
            console.log(events);
        })
            .then(function (events) {
            console.log("sdfjklsdjflkdsf");
            console.log(events);
        });
    }
}
exports.ContractHelper = ContractHelper;
//# sourceMappingURL=contract.helper.js.map