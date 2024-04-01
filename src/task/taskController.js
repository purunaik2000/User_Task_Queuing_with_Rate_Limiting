const getDelayTime = require("./getDelayTime");
const taskQueue = require("../configs/bullConfig");

const taskController = async (req, res) => {
  try {
    // Take userId from request body
    const userId = req.body?.userId;

    // return error responce if userId does not exist
    if (!userId)
      return res.status(400).send({
        status: false,
        message: "User id is required",
      });

    // If user id is already added calculate then calculate the delay time to rate limit
    const delay = await getDelayTime(userId);

    // Add the task in queue
    taskQueue.add(req.body, { delay: delay });

    // Notify user with success response
    res.status(200).send({
      status: true,
      message: "Your request added successfully!",
    });
  } catch (error) {
    // Response for any server side error
    res.status(500).send({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = taskController;
