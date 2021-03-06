const express = require("express");
const { repoIds } = require("../config/repos");
const { formatMREventMessage } = require("../formatter");
const route = express.Router();
const { sendReminderToSlack } = require("../helpers/gitlab");
const { sendMessageToGroup } = require("../helpers/slack");

route.get("/", (req, res) => {
  console.log("here");
  res.send("getting");
});

route.post("/", async (req, res) => {
  const type = req.get("X-Gitlab-Event");
  const message = formatMREventMessage(type, req.body);
  console.log(message);
  await sendMessageToGroup(message);
});

route.get("/test", async (req, res) => {
  await sendReminderToSlack(repoIds.TEST_REPO);
  return res.status(200);
});

module.exports = route;
