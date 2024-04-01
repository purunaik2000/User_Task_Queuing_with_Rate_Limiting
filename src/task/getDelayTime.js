const client = require("../configs/redisConfig");

const getDelayTime = async (userId) => {
  // Get the user details from redis
  const user = await client.GET(`${userId}`);
  let time;
  let tasks;

  if (user) {
    // Get all the tasks user has performed recently
    tasks = await JSON.parse(user);

    // Remove the tasks that are done before 1 min
    while (tasks.length) {
      if (tasks[0] < Date.now() - 60 * 1000) tasks.shift();
      else break;
    }

    // If user did not requested in last 1 min this task will be done now
    if (tasks.length === 0) time = Date.now();
    // If user has requested less that 20 times in last 1 min
    //he can perform the task now if his last task was performed before 1 sec
    // or he can perform the next task after a second
    else if (tasks.length < 20)
      time = Math.max(tasks[tasks.length - 1] + 1000, Date.now());
    // if the user has requested more than 20 times in last 1 min
    else
      time = Math.max(
        tasks[tasks.length - 1] + 1000,
        tasks[tasks.length - 20] + 60 * 1000,
        Date.now()
      );
  } else {
    // If user has not requested in last 1 min
    time = Date.now();
    tasks = [];
  }

  // Add the time when to work on the task
  tasks.push(time);

  // Cache user's request details in redis
  await client.SETEX(`${userId}`, 60, JSON.stringify(tasks));

  return time - Date.now();
};

module.exports = getDelayTime;
