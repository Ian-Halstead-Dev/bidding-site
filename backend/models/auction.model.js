const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  currentBid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  currentBidAmount: { type: Number, default: 0 },
  // End date is the time the bid ends. If the user does not provide a date it ends right away.
  endDate: { type: Number, default: Math.floor(Date.now().getTime() / 1000) },
});

const Auction = mongoose.model("User", auctionSchema);

module.exports = Auction;
