# Contract Helper

Help to interact with Ether Contract

# Sub Modules

- contract.helper.ts
  ETH Contract Wrapper
- swap.router.ts
  DEX Swap Router Wrapper
- swiss.knife.ts
  All kinds of tools
- web.factory.ts
  Creat web3 RPC endpoint

# Demo Code

```
import {
  ContractHelper,
  SwissKnife,
  LoggerFactory,
} from "web3-gear";
import { Config } from "./config";

const userAddress = "0x1582B06D8C4b6c5990E2bA951D88A88363DaB891";

const logger = LoggerFactory.getInstance().getLogger("main");

const swissKnife = new SwissKnife(Config.network);

const chef = new ContractHelper(
  Config.contract.masterChef, // 合约地址
  "./BSC/pancake.swap/master.chef.v2.json",
  Config.network
);

const main = async () => {
  const userInfo = await chef.callReadMethod("userInfo", 2, userAddress);
  console.log(userInfo);
  logger.info(`amount: ${userInfo.amount}`);
  const lptDetails = await swissKnife.getPairedLPTokenDetails(
    Config.contract.lpToken
  );
  console.log(lptDetails);
};

main().catch((e) => {
  console.error(e.message);
});

```

# Demo project 

Check how to use this module in [LPDoge](https://github.com/PercivalZhang/LPDoge)
