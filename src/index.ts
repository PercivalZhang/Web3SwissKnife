import { Web3Factory, NetworkType } from "./lib/web3.factory";
import { SwissKnife } from "./lib/swiss.knife";
import { ContractHelper } from "./lib/contract.helper";
import { LoggerFactory } from "./lib/LoggerFactory";
import { SwapRouter } from "./lib/swap.router";

export = {
  NetworkFactory: {
    Factory: Web3Factory,
    NetworkType: NetworkType,
  },
  SwissKnife: SwissKnife,
  ContractHelper: ContractHelper,
  LoggerFactory: LoggerFactory,
  SwapRouter: SwapRouter,
};
