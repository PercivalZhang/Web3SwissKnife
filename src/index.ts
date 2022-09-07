import { Web3Factory, NetworkType } from "./lib/web3.factory";
import { SwissKnife } from "./lib/swiss.knife";
import { ContractHelper } from "./lib/contract.helper";
import { LoggerFactory } from "./lib/LoggerFactory";
import { SwapRouter } from "./lib/swap.router";
import { ERC20Token } from "./lib/erc20.token";

export = {
  NetworkFactory: {
    Factory: Web3Factory,
    NetworkType: NetworkType,
  },
  SwissKnife: SwissKnife,
  ContractHelper: ContractHelper,
  LoggerFactory: LoggerFactory,
  SwapRouter: SwapRouter,
  ERC20Token: ERC20Token,
};
