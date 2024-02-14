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
    binanceRpc:
      "https://long-quick-film.bsc-testnet.quiknode.pro/bc47cc3990104f27f5c8c57ef6a9cf2afb08fdff/",
  },

  blocksPerSeconds: {
    bsc: 3,
    eth: 12,
  },

  contracts: {
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    ether_usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    ether_usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    wbnb: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    binance_usdt: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    busd: "0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47",
  },
};
