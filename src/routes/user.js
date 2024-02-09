const express = require("express");
const { verifySignature } = require("../middlewares/wagmiService");
const { isLoggedIn } = require("../middlewares/auth");

const { ethereumlogin } = require("../controllers/user");
const userRoutes = express.Router();



userRoutes.post("/ethereumlogin", verifySignature, ethereumlogin);
// userRoutes.post("/authenticate",  authenticate);


userRoutes.get('/', isLoggedIn, (req, res)=> {
    return res.status(200).send({
        msg: "allok"
    })
})

module.exports = { userRoutes };
