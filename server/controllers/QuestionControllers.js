const Question = require("../models/Question");
const tagList = require("../config/tags");
const campusList = require("../config/campuses");
const departmentList = require("../config/departments");

// @desc    Get all allowed tags
// @route   GET /api/tags
exports.getTags = (req, res) => {
  try {
    const tags = require("../config/tags");

    res.status(200).json({
      success: true,
      data: tags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

// @desc    Get all allowed campuses
// @route   GET /api/campuses
exports.getCampuses = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: campusList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

// @desc    Get all allowed departments
// @route   GET /api/departments
exports.getDepartments = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: departmentList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

// @desc    Get all questions
// @route   GET /api/questions
exports.getQuestions = (req, res) => {
  try {
    const questions = Question.getAll();

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

// @desc    Get single question
// @route   GET /api/questions/:id
exports.getQuestion = (req, res) => {
  try {
    const question = Question.getById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

// @desc    Create question
// @route   POST /api/questions
exports.createQuestion = (req, res) => {
  try {
    const { title, content, author, tags, campus, department } = req.body;

    // Check for required title and content
    if (!title || !content || !author || !tags || !campus || !department) {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message:
          "Title, Content, Author, Tags, Campus, and Department are required.",
      });
    }

    // Validate if they are string
    const stringFields = { title, content, author, campus, department };

    for (const [key, value] of Object.entries(stringFields)) {
      const fieldName = key.charAt(0).toUpperCase() + key.slice(1);

      // Check if it's actually a string (Prevents arrays, numbers, objects)
      if (typeof value !== "string") {
        return res.status(400).json({
          success: false,
          error: "Type Error",
          message: `${fieldName} must be a string, not a ${typeof value}.`,
        });
      }

      // Check if the string is empty or just spaces
      if (value.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: "Validation Error",
          message: `${fieldName} cannot be empty.`,
        });
      }
    }

    // Check if tag is array and tag length since we have a tag limit of 5
    if (!Array.isArray(tags) || tags.length > 5) {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: "Tags must be an array with a maximum of 5 elements.",
      });
    }

    // Check if every tag is a valid string
    const allTagsAreStrings = tags.every(
      (tag) => typeof tag === "string" && tag.trim().length > 0,
    );
    if (!allTagsAreStrings) {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: "All tags must be valid strings.",
      });
    }

    // Check if each tag is a valid tag
    const areTagsValid = tags.every((tag) => tagList.includes(tag));
    if (!areTagsValid) {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: "One or more tags are not in the allowed list.",
      });
    }

    // Check if campus is a valid
    if (!campusList.includes(campus)) {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: "Campus must be a valid campus.",
      });
    }

    // Check if department is a valid
    if (!departmentList.includes(department)) {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: "Department must be a valid department.",
      });
    }

    // If everything is valid, proceed to model
    const question = Question.create({
      title,
      content,
      author,
      tags,
      campus,
      department,
    });

    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Bad Request",
      message: error.message,
    });
  }
};

// @desc    Vote on question
// @route   PUT /api/questions/:id/vote
exports.voteQuestion = (req, res) => {
  try {
    const { direction } = req.body;
    const question = Question.vote(req.params.id, direction);

    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

// @desc    Add comment
// @route   POST /api/questions/:id/comments
exports.addComment = (req, res) => {
  try {
    const question = Question.addComment(req.params.id, req.body);

    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question not found",
      });
    }

    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Bad Request",
      message: error.message,
    });
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
exports.deleteQuestion = (req, res) => {
  try {
    const deleted = Question.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/questions/:id/comments/:commentId
exports.deleteComment = (req, res) => {
  try {
    const { id, commentId } = req.params;
    const question = Question.deleteComment(id, commentId);

    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question or Comment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

// @desc    Search questions
// @route   GET /api/questions/search
exports.searchQuestions = (req, res) => {
  try {
    const { q, tags } = req.query;
    const tagArray = tags ? tags.split(",") : [];

    const questions = Question.search(q, tagArray);

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};
