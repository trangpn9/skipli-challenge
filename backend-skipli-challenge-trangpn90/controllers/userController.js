"use strict";
const User = require("../models/user");
const app = require("../firebase");
const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} = require("firebase/firestore");
const client = require("../twilio");

const db = getFirestore(app);

// service add new user
const addUser = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const userRef = doc(db, "users", phoneNumber);
    const data = {
      phoneNumber,
      accessCode: otp,
      favoriteGithubUsers: [],
    };

    // check user exits before add new user
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, {
        accessCode: otp,
      });
      // res.status(200).send(`Record saved successfuly! AccessCode: ${otp}`);
    } else {
      await setDoc(userRef, data);
      // res.status(200).send(`Record saved successfuly! AccessCode: ${otp}`);
    }

    // send opt via twilio
    client.messages
      .create({
        body: `SKIPLI app - Your Access Code: ${otp}`,
        from: "+12624255115",
        to: phoneNumber,
      })
      .then((messages) => console.log(messages))
      .catch((err) => console.error(err));

    res.status(200).json({
      code: "2200",
      message: "Validate successfuly!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// service validate access code
const validateAccessCode = async (req, res, next) => {
  try {
    const { phoneNumber, valAccessCode } = req.body;
    const userRef = doc(db, "users", phoneNumber);
    const userSnap = await getDoc(userRef);
    const { accessCode } = userSnap.data();
    if (parseInt(valAccessCode) === accessCode) {
      await updateDoc(userRef, {
        accessCode: null,
      });
      res.status(200).json({
        code: "2200",
        message: "Validate successfuly!",
      });
    } else {
      res.status(200).json({
        code: "2403",
        message:
          "The access code is not allowed. Please, check your access code!",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// service like github user
const likeGithubUser = async (req, res, next) => {
  try {
    const { phoneNumber, githubUserId } = req.body;
    const userRef = doc(db, "users", phoneNumber);
    await updateDoc(userRef, {
      favoriteGithubUsers: arrayUnion(githubUserId),
    });
    res.status(200).json({
      code: "2200",
      message: "Like successfuly!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// service dislike github user
const dislikeGithubUser = async (req, res, next) => {
  try {
    const { phoneNumber, githubUserId } = req.body;
    const userRef = doc(db, "users", phoneNumber);
    await updateDoc(userRef, {
      favoriteGithubUsers: arrayRemove(githubUserId),
    });
    res.status(200).send("Dislike Github successfuly!");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// service get user profile
const getUserProfile = async (req, res, next) => {
  try {
    const { phoneNumber } = req.params;
    const userRef = doc(db, "users", phoneNumber);
    const userSnap = await getDoc(userRef);
    if (userSnap.data()) {
      const { favoriteGithubUsers } = userSnap.data();
      res.status(200).json({
        code: "2200",
        favoriteGithubUsers,
        message: "success"
      });
    } else {
      res.status(200).json({
        code: "2404",
        favoriteGithubUsers: [],
        message: "User not found!"
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
  validateAccessCode,
  likeGithubUser,
  dislikeGithubUser,
  getUserProfile,
};
