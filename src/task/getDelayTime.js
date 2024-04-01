require('dotenv').config();
const client = require("../configs/redisConfig");

const getDelayTime = async (userId) => {
  const rateWindow = Number(process.env.RATE_LIMIT_WINDOW);
  const ratePerWin = Number(process.env.RATE_LIMIT_MAX_REQUESTS_PER_WINDOW);
  const ratePerSec = Number(process.env.RATE_LIMIT_MAX_REQUESTS_PER_SECOND);
  const currentTime = Date.now();

  // Get the user details from redis
  const user = await client.GET(`${userId}`);
  let time;
  let tasks;

  if (user) {
    // Get all the tasks user has performed recently
    tasks = await JSON.parse(user);

    // Remove the tasks that are done before rateWindow
    while (tasks.length) {
      if (tasks[0] < (Date.now() - rateWindow)) tasks.shift();
      else break;
    }

    // If the user did not requested in last 1 window the task will be done now
    if (tasks.length === 0) time = Date.now();

    // If the user has requested less that ratePerWin times in last 1 window
    //he can perform the task now if his last task was performed before 1/ratePerSec sec
    // or he can perform the next task after 1/ratePerSec second
    else if (tasks.length < ratePerWin)
      time = Math.max(tasks[tasks.length - 1] + (1000/ratePerSec), Date.now());

    // if the user has requested more than ratePerWin times in last 1 window
    else
      time = Math.max(
        tasks[tasks.length - 1] + (1000/ratePerSec),
        tasks[tasks.length - ratePerWin] + rateWindow,
        Date.now()
      );
  } else {
    // If user has not requested in last 1 window
    time = Date.now();
    tasks = [];
  }

  // Add the time when to work on the task
  tasks.push(time);

  // Cache user's request details in redis
  await client.SETEX(`${userId}`, (rateWindow/1000), JSON.stringify(tasks));

  return time - currentTime;
};

module.exports = getDelayTime;
