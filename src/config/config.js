require("dotenv").config();

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  apiVersionUrl: "/api/v1",
  db: {
    str:
      process.env.NODE_ENV === "production"
        ? process.env.CLOUD_MONGO_STRING
        : process.env.CLOUD_MONGO_STRING,
    options: {
      auto_reconnect: true,
      poolSize: 200,
      useNewUrlParser: true,
      readPreference: "primaryPreferred",
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRES_IN,
    cookieExpirationTime: process.env.JWT_COOKIE_EXPIRES_IN,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },

  priceApi: {
    etherPriceApi1:
      "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=",
    etherPriceApi2:
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    binancePriceApi1:
      "https://api.diadata.org/v1/assetQuotation/BinanceSmartChain/0x0000000000000000000000000000000000000000",
  },

  web3Rpc: {
    ethereumRpc: "https://rpc.ankr.com/eth",
    binanceRpc: "https://bsc-dataseed1.binance.org",
  },

  contracts: {
    ether_usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    ether_usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    binance_usdt: "0x55d398326f99059fF775485246999027B3197955",
    busd: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  }
   
  // contracts: {
  // 	BNBUSD_Price_Feed_Address: process.env.BNBUSD_Price_Feed,
  // 	ETHUSD_Price_Feed_Address: process.env.ETHUSD_Price_Feed,
  // },
};
