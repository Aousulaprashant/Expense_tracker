// Create a new file called Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
