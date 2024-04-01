const router = require("express").Router();
const taskController = require("./task/taskController");

router.post("/task", taskController);

router.all("*", (req, res) =>
  res.status(404).send({ status: false, message: "Invalid route" })
);

module.exports = router;
