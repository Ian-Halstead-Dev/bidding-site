const express = require("express");
const router = express.Router();
const Auction = require("../models/auction.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth");

router.get("/:id", async (req, res) => {
  const auction = await Auction.findById(req.query.id);
  if (!auction) {
    res.status(404).send({ e: auctionNotFound });
  }

  res.status(200).send({ auction });
});

router.post("/", auth, async (req, res) => {
  const auction = new Auction({ ...req.body, user: req.user._id });
  await auction.save();

  try {
    res.status(201).send(auction);
  } catch (e) {
    console.log(e);
    res.status(400).send(auction);
  }
});

module.exports = router;
