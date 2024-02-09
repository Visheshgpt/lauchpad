const logger = require("../helpers/logger");
const User = require("../models/user");
const Account = require("../models/account");
const config = require("../config/config");

exports.ethereumlogin = async (req, res) => {
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

    const user = await User.findOne({ account: account._id }).exec();
    const token = user.getJwtToken();
    console.log("token", token);

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
