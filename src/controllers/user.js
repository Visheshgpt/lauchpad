const logger = require("../helpers/logger");
const User = require("../models/user");
const Account = require("../models/account");
const config = require("../config/config");
const { fetchHoldings } = require("../helpers/fetchHoldings");

const ethereumlogin = async (req, res) => {
  try {
    const { data } = req.fields;
    const { issuedAt, address } = data;

    const account = await Account.findOne({ address: address.toLowerCase() });
    if (!account) {
      const account = new Account({
        address: address.toLowerCase(),
        lastActive: parseInt(Date.now() / 1000),
      });
      await account.save();

      const user = new User({ account: account._id });
      await user.save();

      const token = user.getJwtToken();
      res.cookie("token", token, {
        expires: new Date(
          Date.now() + parseInt(config.jwt.cookieExpirationTime)
        ),
        httpOnly: true,
      });

      user.account = account;
      return res.status(200).send({
        msg: "success",
        user,
        token,
      });
    }

    account.lastActive = parseInt(Date.now() / 1000);
    await account.save();

    const user = await User.findOne({ account: account._id }).exec();
    const token = user.getJwtToken();

    res.cookie("token", token, {
      expires: new Date(Date.now() + parseInt(config.jwt.cookieExpirationTime)),
      httpOnly: true,
    });

    user.account = account;

    return res.status(200).send({
      msg: "success",
      user,
      token,
    });
  } catch (error) {
    console.log("error", error);
    res.status(401).send({
      msg: error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { user } = req;
    const account = await Account.findById(user?.account);
    user.account = account;
    return res.status(200).send(user);
  } catch (error) {
    console.log("error", error);
    res.status(401).send({
      msg: error,
    });
  }
};

const holdings = async (req, res) => {
  try {
    const { user } = req;
    const account = await Account.findById(user?.account);
    user.account = account;

    return res
      .status(200)
      .send([account.holdingsHistory, account.holdingsTimeline]);
  } catch (error) {
    console.log("error", error);
    res.status(401).send({
      msg: error,
    });
  }
};

const iskycVerified = async (req, res) => {
  try {
    const walletAddress = req.params.walletAddress;
    const account = await Account.findOne({
      address: walletAddress.toLowerCase(),
    });

    await fetchHoldings(walletAddress);

    return res.status(200).send({
      iskycVerified: account.isKycVerified,
    });
  } catch (error) {
    console.log("error", error);
    res.status(401).send({
      msg: error,
    });
  }
};

const price = async (req, res) => {
  try {
    const { price } = req;
    return res.status(200).send({
      price,
    });
  } catch (error) {
    return res.status(500).send({
      error: error,
    });
  }
};

module.exports = {
  ethereumlogin,
  getUser,
  holdings,
  iskycVerified,
  price,
};
