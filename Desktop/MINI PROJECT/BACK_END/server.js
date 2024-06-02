const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const requestRouter = require("./routes/api/request");
const Feedback = require("./db/FeedbackSchema");
const router = express.Router();
const fileUpload = require("express-fileupload");
const connectDB = require("./db/dbConnections");

const User = require("./db/User");
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//MIDDLEWARE FOR PARSING JSON

app.use(express.json());
app.use(cors());
app.use("/api", requestRouter);
app.get("/students/:username", async (req, res) => {
  try {
    const student = await User.findOne({ username: req.params.username });
    if (student) {
      res.json({ success: true, data: student });
    } else {
      res.json({ success: false, message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

app.post("/register", async (req, res) => {
  try {
    const {
      username,
      password,
      fatherName,
      phoneNumber,
      name,
      skill,
      projects,
      experience,
    } = req.body;

    const user = new User({
      username,
      password,
      fatherName,
      phoneNumber,
      name,
      skill,
      projects,
      experience,
    });

    await user.save();
    res.status(201).json({ message: "Registration Sucess" });
  } catch (error) {
    res.status(400).json({ error: "Registration FAILED" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401), json({ error: "invalid user name or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "invalid password" });
    }

    res.status(200).json({ message: "login has success" });
  } catch (error) {
    res.status(200).json({ error: "login has failed!!" });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await User.find().select("name username"); // fetch all students and select only the name field
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.post("/api/feedback", async (req, res) => {
  const { username, feedback } = req.body;

  try {
    const newFeedback = new Feedback({ username, feedback });
    await newFeedback.save();

    res.status(200).json({ message: "Feedback sent successfully!" });
  } catch (error) {
    console.error("Error sending feedback:", error);
    res.status(500).json({ message: "Error sending feedback" });
  }
});

app.get("/api/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().exec();
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Error fetching feedbacks" });
  }
});
// Assuming you have a Feedback model

app.delete("/api/feedbacks/:id", async (req, res) => {
  try {
    const username = req.params.id;

    // Find and delete the object with the specified username
    const result = await Feedback.deleteOne({ username: username });

    if (result.deletedCount === 1) {
      // Object was deleted successfully
      res.status(200).json({ message: "Object deleted successfully" });
    } else {
      // Object with the specified username was not found
      res.status(404).json({ message: "Object not found" });
    }
  } catch (error) {
    // Internal server error
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const username = req.params.id;
    await User.findOneAndDelete({ username: username });
    res.status(200).json({ msg: "deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});
const students = [];

app.get("/students/:id", (req, res) => {
  const student = students.find((student) => student.id === req.params.id);
  if (!student) return res.status(404).send("Student not found");
  res.send(student);
});
app.put("/students/:id", async (req, res) => {
  try {
    const username = req.params.id;
    const updatedStudent = req.body;

    // Update the student in your database or data storage
    // For example, using a fictional `Student` model:
    const student = await User.findOneAndUpdate(
      { username: username },
      updatedStudent,
      {
        new: true,
      }
    );

    if (!student) {
      res.status(404).send({ message: "Student not found" });
    } else {
      res.send(student);
    }
  } catch (error) {
    // Handle any errors that occur during the execution of the asynchronous function
    console.error(error);
    res.status(500).send({ message: "Error updating student" });
  }
});

app.use("/api", require("./routes/upload"));

// Validate the student data
function validateStudent(student) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    fatherName: Joi.string().required(),
    phone: Joi.string().required(),
  });

  return Joi.validate(student, schema);
}

connectDB();

app.listen(port, () => {
  console.log("server is listaning");
});
