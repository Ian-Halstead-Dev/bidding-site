const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  currentBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  currentBidAmount: {
    type: Number,
    default: 0,
  },

  description: {
    type: string,
  },

  /*
  Increment By is the amount of money each bid must be raised by in dollars
  */
  incrementBy: {
    type: Number,
    default: 1,
  },

  /* 
  End date is the time the bid ends as unix time (
    https://en.wikipedia.org/wiki/Unix_time#:~:text=Unix%20time%20is%20a%20date,made%20due%20to%20leap%20seconds.
  If the user does not provide a date it ends right away.
  */
  endDate: {
    type: Number,
    default: Math.floor(Date.now().getTime() / 1000),
  },
});

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;
