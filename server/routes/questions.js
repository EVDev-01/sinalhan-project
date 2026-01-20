const express = require("express");
const router = express.Router();

// Destructuring functions from your QuestionControllers.js
const {
  searchQuestions,
  getTags,
  getCampuses,
  getDepartments,
  getQuestions,
  getQuestion,
  createQuestion,
  voteQuestion,
  addComment,
  deleteQuestion,
  deleteComment,
} = require("../controllers/QuestionControllers");

// Search must be defined before the /:id parameter route
router.get("/search", searchQuestions);

// Get the tag list
router.get("/tags", getTags);

// Get the campus list
router.get("/campuses", getCampuses);

// Get the deparment list
router.get("/departments", getDepartments);

// Get all questions
router.get("/", getQuestions);

// Get specific question based on ID
router.get("/:id", getQuestion);

// Post a new question
router.post("/", createQuestion);

// Delete a specific question
router.delete("/:id", deleteQuestion);

// Add vote for a specific question
router.put("/:id/vote", voteQuestion);

// Add comment for a specific question
router.post("/:id/comments", addComment);

// Delete a specific comment
router.delete("/:id/comments/:commentId", deleteComment);

module.exports = router;
