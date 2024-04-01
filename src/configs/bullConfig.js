require("dotenv").config();
const Queue = require("bull");
const task = require('../task/task');

const taskQueue = new Queue(process.env.QUEUE_NAME, {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
});

taskQueue.process((job, done) => {
  // Task will be performed here
  task(job.data?.userId);
  done(job);
});

module.exports = taskQueue;
