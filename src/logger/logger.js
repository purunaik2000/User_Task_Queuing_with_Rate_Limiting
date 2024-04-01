require('dotenv').config();
const winston = require('winston');
const { printf, combine, timestamp } = winston.format;

const logger = winston.createLogger({
    format: combine(
        timestamp(),
        printf((info)=>`${info.message}-task-completed-at-${Date.now()}`)
    ),
    transports: [new winston.transports.File({filename: process.env.LOG_PATH})]
});

module.exports = logger;