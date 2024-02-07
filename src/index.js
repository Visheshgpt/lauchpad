require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const router = require("./route");
const db = require("./connections/dbMaster");
const config = require("./config/config");
const logger = require("./helpers/logger");
 
const app = express();

if (config.nodeEnv === 'development') {
	app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set Secure HTTP headers
app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  max: 1000000,
  windowMs: 1 * 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in 1 hour!",
});


// app.use(
//   cors({
//     origin: process.env.ALLOWEDORIGIN,
//     methods: ["POST"],
//     allowedHeaders: ["Content-Type"],
//     maxAge: 600,
//   })
// );

// Define a middleware to check the origin of incoming requests
// const checkOrigin = (req, res, next) => {
//   const allowedOrigin = process.env.ALLOWEDORIGIN;

//   // Check if the request's Origin header matches the allowed origin
//   const requestOrigin = req.get("Origin");

//   if (requestOrigin === allowedOrigin) {
//     next(); // Allow the request to proceed
//   } else {
//     res.status(403).json({ error: "Forbidden" }); // Return a 403 Forbidden response
//   }
// };

// adding morgan to log HTTP requests
// app.use(morgan("combined"));
app.use("/api", limiter);
// app.use(checkOrigin);

app.use(config.apiVersionUrl, router);
app.get(config.apiVersionUrl, () => {
	logger.info('Response');
});

app.listen(process.env.PORT || 8000, function () {
  console.log("express app started on the port " + (process.env.PORT || 3000));
});
