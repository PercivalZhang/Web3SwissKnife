import { AbiItem } from "web3-utils";
import { ContractHelper } from "./contract.helper";
import { NetworkType } from "./web3.factory";
import BigNumber from "bignumber.js";
import { SwissKnife } from "./swiss.knife";

import RouterABI from "../abi/router.json";

export class SwapRouter {
  private swissknife: SwissKnife;
  private methodMap: Map<string, string> = new Map<string, string>();
  private router: ContractHelper;

  constructor(
    address: string,
    network: NetworkType,
    abiJSON = RouterABI as AbiItem[]
  ) {
    this.router = new ContractHelper(address, abiJSON, network);
    this.swissknife = new SwissKnife(network);
    this.methodMap.set("getAmountsOut", "getAmountsOut");
  }

  public async getAmountsOut(
    inputTokenAddress: string,
    inputTokenDecimalAmount: number,
    paths: string[]
  ): Promise<number> {
    try {
      if (paths.length < 2) return -1;
      const inputToken = await this.swissknife.syncUpTokenDB(inputTokenAddress);
      const inputTokenAmount = new BigNumber(
        inputTokenDecimalAmount
      ).multipliedBy(Math.pow(10, inputToken.decimals));
      const amountsOutData = await this.router.callReadMethod(
        this.methodMap.get("getAmountsOut"),
        inputTokenAmount,
        paths
      );

      const outputToken = await this.swissknife.syncUpTokenDB(
        paths[paths.length - 1]
      );

      return outputToken.readableAmount(amountsOutData[1]);
    } catch (e) {
      console.error(e.message);
      return -1;
    }
  }

  public setMethodMap(methodName: string, methodNameOfContract: string) {
    this.methodMap.set(methodName, methodNameOfContract);
  }

  public setMethodNameOfGetAmountsOut(methodNameOfContract: string) {
    this.methodMap.set("getAmountsOut", methodNameOfContract);
  }
}
