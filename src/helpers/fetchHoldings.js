const { Web3 } = require("web3");
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
const bscBusdContract = new bscWeb3.eth.Contract(abi, config.contracts.busd);

const fetchHoldings = async ({
  wallet,
  ethBlockNumber = "latest",
  bscBlockNumber = "latest",
}) => {
  try {
    updateBlock(ethBlockNumber, bscBlockNumber);

    const ethBalanceCall = ethWeb3.eth.getBalance(wallet);
    const bscBalanceCall = bscWeb3.eth.getBalance(wallet);
    const ethUsdtCall = ethUsdtContract.methods.balanceOf(wallet).call();
    const bscUsdtCall = bscUsdtContract.methods.balanceOf(wallet).call();
    const bscBusdCall = bscBusdContract.methods.balanceOf(wallet).call();

    const [ethBal, bnbBal, ethUsdtBal, bscUsdtBal, bscBusdBal] =
      await Promise.all([
        ethBalanceCall,
        bscBalanceCall,
        ethUsdtCall,
        bscUsdtCall,
        bscBusdCall,
      ]);

    let price = await redisClient.get("price");
    if (price === null) {
      price = await fetchCurrentPrice();
      await redisClient.set("price", JSON.stringify(price), "EX", 900);
    }

    if (typeof price === "string") {
      price = JSON.parse(price);
    }

    const bnb = new BigNumber(bnbBal).div(1e18).times(price.binancePrice);
    const bscUsdt = new BigNumber(bscUsdtBal).div(1e18);
    const bscBusd = new BigNumber(bscBusdBal).div(1e18);

    const ether = new BigNumber(ethBal).div(1e18).times(price.etherPrice);
    const ethUsdt = new BigNumber(ethUsdtBal).div(1e18);

    const totalHoldings = bnb
      .plus(bscUsdt)
      .plus(bscBusd)
      .plus(ether)
      .plus(ethUsdt)
      .toFixed(4);

    return totalHoldings;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const updateBlock = (ethBlockNumber, bscBlockNumber) => {
  bscWeb3.config.defaultBlock = ethBlockNumber;
  ethUsdtContract.config.defaultBlock = ethBlockNumber;

  bscWeb3.config.defaultBlock = bscBlockNumber;
  bscUsdtContract.config.defaultBlock = bscBlockNumber;
  bscBusdContract.config.defaultBlock = bscBlockNumber;
};

module.exports = {
  fetchHoldings,
};
