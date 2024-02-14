const mongoose = require('mongoose')
const config = require('../config/config');
const logger = require('../helpers/logger');

const db = mongoose.createConnection(config.db.str)
// mongoose.set('debug', true);

// CONNECTION EVENTS

// When successfully connected
db.on('connected', () => {
	logger.info('Mongoose connection open to master DB')
	mongoose.set('debug', true);
})

// If the connection throws an error
db.on('error', (error) => {
	logger.debug(`Mongoose connection error for master DB: ${error}`)
})

// When the connection is disconnected
db.on('disconnected', () => {
	logger.debug('Mongoose connection disconnected for master DB')
})

// When connection is reconnected
db.on('reconnected', () => {
	logger.info('Mongoose connection reconnected for master DB')
})
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
	db.close(() => {
		logger.debug(
			'Mongoose connection disconnected for master DB through app termination'
		)
		// eslint-disable-next-line no-process-exit
		process.exit(0)
	})
})

module.exports = db;