const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  views: { type: Number, default: 0 },
  lastViewedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
