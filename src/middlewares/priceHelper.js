const { redisClient } = require("../connections/reddis");
const { fetchCurrentPrice } = require("../helpers/fetchPrice");

const fetchPrice = async (req, res, next) => {
  try {
    const cachedPrice = await redisClient.get("price");
    if (cachedPrice !== null) {
      req.price = JSON.parse(cachedPrice);
    } else {
      const price = await fetchCurrentPrice();
      await redisClient.set("price", JSON.stringify(price), "EX", 900);
      req.price = price;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchPrice,
};
