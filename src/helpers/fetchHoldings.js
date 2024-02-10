const  {Web3}  = require("web3");
const config = require("../config/config");
const { BigNumber } = require("bignumber.js");
const { redisClient } = require("../connections/reddis");
const { fetchCurrentPrice } = require("./fetchPrice");


const abi = [
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const ethWeb3 = new Web3(config.web3Rpc.ethereumRpc);
const bscWeb3 = new Web3(config.web3Rpc.binanceRpc);

const ethUsdtContract = new ethWeb3.eth.Contract(
  abi,
  config.contracts.ether_usdt
);

const bscUsdtContract = new bscWeb3.eth.Contract(
  abi,
  config.contracts.binance_usdt
);

const fetchHoldings = async (wallet) => {
  try {
    const ethBalanceCall = ethWeb3.eth.getBalance(wallet);
    const bscBalanceCall = bscWeb3.eth.getBalance(wallet);
    const ethUsdtCall = ethUsdtContract.methods.balanceOf(wallet).call();
    const bscUsdtCall = bscUsdtContract.methods.balanceOf(wallet).call();

    const [ethBal, bscBal, ethUsdtBal, bscUsdtBal] = await Promise.all([
      ethBalanceCall,
      bscBalanceCall,
      ethUsdtCall,
      bscUsdtCall,
    ]);

    let price = await redisClient.get("price");
    if (price === null) {
      price = await fetchCurrentPrice();
      await redisClient.set("price", JSON.stringify(price), "EX", 900);
    }
    console.log(price);

    console.log("bscBal", bscUsdtBal);
  } catch (error) {
    console.log("errorr", error);
  }
};

module.exports = {
  fetchHoldings,
};
