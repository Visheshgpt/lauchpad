const logger = require("../helpers/logger");
const { User, userSales } = require("../models/user");
const Account = require("../models/account");
const config = require("../config/config");
const { fetchHoldings } = require("../helpers/fetchHoldings");
const { handleError, handleResponse } = require("../helpers/responseHandler");
const fetchHoldingHistory = require("../helpers/fetchHoldingHistory");
const Ido = require("../models/ido");

const ethereumlogin = async (req, res) => {
  try {
    const { data } = req.fields;
    const { issuedAt, address } = data;

    const account = await Account.findOne({ address: address.toLowerCase() });
    if (!account) {
      const account = new Account({
        address: address.toLowerCase(),
        lastActive: new Date(),
      });
      const holdings = await fetchHoldings({ wallet: address });
      account.holdingsHistory = [
        {
          amount: holdings,
          timestamp: new Date(),
        },
      ];
      account.lastBalanceCheckedTime = new Date();
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

      handleResponse({ res, data: { user, token } });
      return;
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

    handleResponse({ res, data: { user, token } });
  } catch (error) {
    handleError({ res, err_msg: "Error in login", error });
  }
};

const getUser = async (req, res) => {
  try {
    const { user } = req;
    handleResponse({ res, data: user });
  } catch (error) {
    handleError({ res, error });
  }
};

const iskycVerified = async (req, res) => {
  try {
    const walletAddress = req.params.walletAddress;
    const account = await Account.findOne({
      address: walletAddress.toLowerCase(),
    });
    handleResponse({ res, data: { iskycVerified: account.isKycVerified } });
  } catch (error) {
    handleError({ res, error });
  }
};

const holdings = async (req, res) => {
  try {
    const { account } = req.user;
    const data = account.holdingsHistory;

    handleResponse({ res, data });
  } catch (error) {
    handleError({ res, error });
  }
};

const updateHoldings = async (req, res) => {
  try {
    const { address } = req.user.account;

    const account = await Account.findOne({ address: address?.toLowerCase() });

    if (!account) {
      handleError({ res, statusCode: 404, error: "Account not found" });
      return;
    }

    const oneHourAgo = new Date(Date.now() - 1 * 60 * 60 * 1000);
    if (
      !account.lastBalanceCheckedTime ||
      account.lastBalanceCheckedTime < oneHourAgo
    ) {
      const holdingsData = await fetchHoldingHistory(address);

      if (Array.isArray(holdingsData) && holdingsData.length > 0) {
        const oldData = account.holdingsHistory || [];
        const updatedHolding = [...oldData, ...holdingsData];

        updatedHolding.sort((a, b) => a.timestamp - b.timestamp);

        account.holdingsHistory = updatedHolding;
        account.lastBalanceCheckedTime = new Date();
        await account.save();
      }
      handleResponse({ res, data: account?.holdingsHistory || {} });
      return;
    }

    handleResponse({
      res,
      msg: "Already up to date",
      data: account?.holdingsHistory || {},
    });
  } catch (error) {
    handleError({ res, error });
  }
};

const registerIdo = async (req, res) => {
  try {
    const idoId = req.params.idoId;
    const user = req.user;

    const ido = await Ido.findById(idoId);

    const currDate = new Date();
    const startDate = new Date(ido.startDate * 1000);
    const endDate = new Date(ido.endDate * 1000);

    if (!(currDate > startDate && currDate < endDate)) {
      handleError({ res, error: "Ido registration not live" });
      return;
    }

    if (Array.isArray(ido.users) && ido.users.includes(user._id)) {
      handleResponse({
        res,
        statusCode: 201,
        msg: "Already registered",
        data: {},
      });
      return;
    }

    const holdings = await fetchHoldings({ wallet: user?.account?.address });

    ido.totalAssetsConnected = ido.totalAssetsConnected + parseInt(holdings);
    ido.users.push(user);

    const userSale = {
      ido: ido._id,
      participationDate: new Date(),
    };
    user.sales.push(userSale);
    await Promise.all([user.save(), ido.save()]);

    handleResponse({
      res,
      data: user,
    });
  } catch (error) {
    handleError({ res, error });
  }
};

const getallSales = async (req, res) => {
  try {
    const user = req.user;

    const userId = user._id;
    const userSalesWithIDODetails = await User.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $unwind: "$sales",
      },
      {
        $lookup: {
          from: "idos",
          localField: "sales.ido",
          foreignField: "_id",
          as: "sales.idoDetails",
        },
      },
      {
        $group: {
          _id: "$_id",
          sales: { $push: "$sales" },
        },
      },
    ]);

    handleResponse({
      res,
      data: userSalesWithIDODetails || {},
    });
  } catch (error) {
    handleError({ res, error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await User.find().populate("account");
    handleResponse({ res, data });
  } catch (error) {
    handleError({ res, error });
  }
};

const price = async (req, res) => {
  try {
    const { price } = req;
    return res.status(200).send({
      price,
    });
  } catch (error) {
    handleError({ res, error });
  }
};

module.exports = {
  ethereumlogin,
  getUser,
  holdings,
  updateHoldings,
  iskycVerified,
  registerIdo,
  getallSales,
  getAllUsers,
};
