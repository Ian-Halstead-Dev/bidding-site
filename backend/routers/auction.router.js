const express = require("express");
const router = express.Router();
const Auction = require("../models/auction.model");
const User = require("../models/user.model");

router.get("/:id", (req, res) => {
  const auction = Auction.findById(req.query.id);
  if (!auction) {
    res.status(404).send({ e: auctionNotFound });
  }

  res.status(200).send({ auction });
});

router.post("/", (req, res) => {
  const user = User.
});

module.exports = router;
