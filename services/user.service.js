const User = require("../models/user.model");

const getUserBySlackId = async (slackId) => {
  return User.findOne({ slackId });
};

const addUser = async (slackId) => {
  const user = await User.create({
    slackId,
    gitlabUsername: "",
    subscriptions: [],
  });
  return user;
};

const updateGitlabUsername = async ({ slackId, gitlabUsername }) => {
  const user = await User.findOneAndUpdate(
    {
      slackId,
    },
    { gitlabUsername }
  );
  return user;
};

const subscribeToRepo = async ({ slackId, repoId }) => {
  const user = await User.findOneAndUpdate(
    {
      slackId,
    },
    { $addToSet: { subscriptions: repoId } }
  );
  return user;
};

const unsubscribeToRepo = async ({ slackId, repoId }) => {
  const user = await User.findOneAndUpdate(
    {
      slackId,
    },
    { $pull: { subscriptions: repoId} }
  );
  return user;
};

const getSubscribedRepos = async (slackId) => {
  const user = await User.findOne({ slackId })
  return user.subscriptions
}

module.exports = {
  getUserBySlackId,
  addUser,
  updateGitlabUsername,
  subscribeToRepo,
  unsubscribeToRepo,
  getSubscribedRepos
};
