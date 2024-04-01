const logger = require("../logger/logger");

const task = async (userId) => {
  //Provided task function
  logger.info(userId);
};

module.exports = task;
