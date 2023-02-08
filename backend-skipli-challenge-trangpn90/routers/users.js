const express = require("express");
const {
  addUser,
  likeGithubUser,
  dislikeGithubUser,
  getUserProfile,
  validateAccessCode,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Express App generate OTP via Twilio!");
});

router.post("/user", addUser);

router.post("/user/validate", validateAccessCode);
router.put("/user/like-github", likeGithubUser);
router.put("/user/dislike-github", dislikeGithubUser);

router.get("/user/:phoneNumber", getUserProfile);

module.exports = { routers: router };
