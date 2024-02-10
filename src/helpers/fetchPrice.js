const config = require("../config/config");
const logger = require("./logger");
const axios = require("axios");

const getEthereumCurrentPrice = async () => {
  try {
    logger.info("Call getEthereumCurrentPrice");

    const response = await axios.get(config.priceApi.etherPriceApi2);
    return Number(response.data.ethereum.usd);
  } catch (e) {
    logger.debug(`Error in ethereum price api: ${error}`);
    return null;
  }
};

const getBinanceCurrentPrice = async () => {
  try {
    logger.info("Call getBinanceCurrentPrice....");
    const { data } = await axios.get(config.priceApi.binancePriceApi1);
    return data.Price;
  } catch (error) {
    logger.debug(`Error in binance price api: ${error}`);
    return null;
  }
};

const fetchCurrentPrice = async () => {
  const etherPrice = await getEthereumCurrentPrice();
  const binancePrice = await getBinanceCurrentPrice();

  return {
    etherPrice,
    binancePrice,
  };
};

module.exports = {
  getEthereumCurrentPrice,
  getBinanceCurrentPrice,
  fetchCurrentPrice,
};
