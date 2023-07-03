const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    year: { type: String },
    director: { type: String },
    actors: [String],
    description: { type: String },
    imgUrl: { type: String },
    favorite: { type: Boolean, default: false },
    genre: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
