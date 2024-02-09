require("dotenv").config();

module.exports = {
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT, 
	apiVersionUrl: '/api/v1',
	db: {
		str:
			process.env.NODE_ENV === 'production'
				? process.env.CLOUD_MONGO_STRING
				: process.env.CLOUD_MONGO_STRING,
		options: {
			auto_reconnect: true,
			poolSize: 200,
			useNewUrlParser: true,
			readPreference: 'primaryPreferred',
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		},
	},

	jwt: {
		secret: process.env.JWT_SECRET,
		expirationTime: process.env.JWT_EXPIRES_IN,
		cookieExpirationTime: process.env.JWT_COOKIE_EXPIRES_IN
	}

	// ETHEREUM_WS_URL: process.env.ETHEREUM_WS_URL,
	// ETHEREUM_RPC_URL: process.env.ETHEREUM_RPC_URL,
	// BSC_WS_URL: process.env.BSC_WS_URL,
	// BSC_RPC_URL: process.env.BSC_RPC_URL,

	// contracts: {
	// 	BNBUSD_Price_Feed_Address: process.env.BNBUSD_Price_Feed,
	// 	ETHUSD_Price_Feed_Address: process.env.ETHUSD_Price_Feed,
	// },

};