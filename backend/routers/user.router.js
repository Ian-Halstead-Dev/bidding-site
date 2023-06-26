const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require("dotenv").config();

router.post("/", async (req, res) => {
  // fieldsToDelete will delete a field from user before it is saved to database
  const fieldsToDelete = [];

  fieldsToDelete.forEach((field) => {
    if (req.body[field]) {
      delete req.body[field];
    }
  });

  const user = new User({
    ...req.body,
  });

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.name, req.body.password);

    let token = await user.generateAuthToken();

    res.status(200).send(token);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.delete("/me", auth, async (req, res) => {
  if (!req.user) {
    res.status(400).send("Not Signed In");
  }
  try {
    const user = await User.deleteOne({ name: req.user.name });
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

router.delete("/dev/all", async (req, res) => {
  if (req.query.pass === process.env.DEV_PASS) {
    await User.deleteMany({});
    res.status(200).send("Deleted");
  } else {
    res.status(401).send("Not Allowed");
  }
});

router.post("/logout", auth, async (req, res) => {
  if (!req.user) {
    res.status(400).send("Not Signed In");
  }
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token != req.token
    );
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/logoutAll", auth, async (req, res) => {
  if (!req.user) {
    res.status(400).send("Not Signed In");
  }
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/me", auth, async (req, res) => {
  if (!req.user) {
    res.status(400).send("Not Signed In");
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = req.user;

    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get;

module.exports = router;
