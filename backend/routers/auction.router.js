const express = require("express");
const router = express.Router();
const Auction = require("../models/auction.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth");

router.get("/:id", async (req, res) => {
  const auction = await Auction.findById(req.params.id);
  const obj = await Auction.findById(req.params.id)
    .populate("owner")
    .populate("currentBidder")
    .exec();

  owner = obj.owner;
  currentBidder = obj.currentBidder;

  if (!auction) {
    res.status(404).send({ e: auctionNotFound });
  }

  res.status(200).send({ auction, owner, currentBidder });
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

router.post("/bid", auth, async (req, res) => {
  const auction = await Auction.findById(req.body.auctionId);
  if (req.body.bid - auction.currentBidAmount < auction.incrementBy) {
    res.status(400).send({
      error: `bid for this auction must be greater than $${
        auction.currentBidAmount + auction.incrementBy
      } right now`,
    });
  }

  auction.currentBidAmount = req.body.bid;
  auction.currentBidder = req.user._id;

  try {
    await auction.save();

    res.status(200).send({ auction });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }
});

module.exports = router;
