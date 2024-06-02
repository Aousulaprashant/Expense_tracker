const express = require("express");
const Feedback = require("../api/request"); // Added import statement
const router = express.Router();
const { check, validationResult } = require("express-validator"); // Added for input validation

// Input validation rules
const validationRules = [
  check("feedback", "Feedback is required").not().isEmpty(),
  check("studentId", "Student ID is required").not().isEmpty(),
];

router.post("/", validationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: "Invalid input" });
  }

  const { feedback, studentId } = req.body;
  try {
    const newFeedback = new Feedback({ studentId, feedback });
    await newFeedback.save();
    res.json({ success: true, message: "Feedback saved successfully" });
  } catch (error) {
    console.error("Error saving update:", error);
    res.status(500).json({ success: false, error: "Error saving feedback" });
  }
});

module.exports = router;
