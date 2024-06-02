const mongoose = require("mongoose");
const userScema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  Phone: {
    type: Number,
    required: false,
  },
  fatherName: {
    type: String,
    required: false,
  },
  skill: {
    type: String,
    required: false,
  },
  projects: [
    {
      name: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
  ],
  experience: [
    {
      company: {
        type: String,
        required: false,
      },
      position: {
        type: String,
        required: false,
      },
      startDate: {
        type: Date,
        required: false,
      },
      endDate: {
        type: Date,
      },
      description: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model("Users", userScema);

module.exports = User;
