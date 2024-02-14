const config = require("../config/config");
const { Web3 } = require("web3");
const { fetchHoldings } = require("./fetchHoldings");

const ethWeb3 = new Web3(config.web3Rpc.ethereumRpc);
const bscWeb3 = new Web3(config.web3Rpc.binanceRpc);

const fourHoursInSeconds = 14400;

const ethBlockTime = config.blocksPerSeconds.eth;
const bscBlockTime = config.blocksPerSeconds.bsc;

const fetchHoldingHistory = async (wallet) => {
  try {
    const ethBlockinTwoHours = parseInt(fourHoursInSeconds / ethBlockTime);
    const bscBlockinTwoHours = parseInt(fourHoursInSeconds / bscBlockTime);

    const [currentBlockEth, currentBlockBsc] = await Promise.all([
      ethWeb3.eth.getBlockNumber(),
      bscWeb3.eth.getBlockNumber(),
    ]);

    let prevBlockEth = Number(currentBlockEth);
    let prevBlockBsc = Number(currentBlockBsc);

    const calls = [];
    calls.push(() => fetchHoldings({ wallet }));

    for (let index = 0; index < 4; index++) {
      prevBlockEth = prevBlockEth - ethBlockinTwoHours;
      prevBlockBsc = prevBlockBsc - bscBlockinTwoHours;
      calls.push(() =>
        fetchHoldings({
          wallet,
          ethBlockNumber: prevBlockEth,
          bscBlockNumber: prevBlockBsc,
        })
      );
    }

    const data = await Promise.all(calls.map((call) => call()));

    const holdingsData = [];

    for (let index = 0; index <= 4; index++) {
      holdingsData.push({
        amount: data[index],
        timestamp: new Date(Date.now() - index * fourHoursInSeconds * 1000),
      });
    }
    return holdingsData;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

module.exports = fetchHoldingHistory;
