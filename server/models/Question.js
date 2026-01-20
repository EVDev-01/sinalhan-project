const db = require("../config/database");
const tagList = require("../config/tags");

const MAX_TAGS = 5;

class Question {
  // Get time ago string
  static getTimeAgo(timestamp) {
    const now = new Date();
    const created = new Date(timestamp);
    const diff = now - created;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  // Format question with comments
  static formatQuestion(question) {
    // Get comments for this question
    const comments = db
      .prepare(
        `
      SELECT * FROM comments
      WHERE question_id = ?
      ORDER BY created_at DESC
    `,
      )
      .all(question.id);

    return {
      id: question.id,
      title: question.title,
      content: question.content,
      author: question.author,
      tags: question.tags ? JSON.parse(question.tags) : [],
      campus: question.campus,
      department: question.department,
      votes: question.votes,
      views: question.views,
      comments: comments.map((c) => ({
        id: c.id,
        text: c.text,
        author: c.author,
        votes: c.votes,
        timestamp: this.getTimeAgo(c.created_at),
      })),
      timestamp: this.getTimeAgo(question.created_at),
      createdAt: question.created_at,
      updatedAt: question.updated_at,
    };
  }

  // Get all questions
  static getAll() {
    const questions = db
      .prepare(
        `
      SELECT * FROM questions
      ORDER BY created_at DESC
    `,
      )
      .all();

    return questions.map((q) => this.formatQuestion(q));
  }

  // Get single question by ID
  static getById(id) {
    const question = db
      .prepare(
        `
      SELECT * FROM questions WHERE id = ?
    `,
      )
      .get(id);

    if (!question) return null;

    // Increment views
    db.prepare(
      `
      UPDATE questions
      SET views = views + 1
      WHERE id = ?
    `,
    ).run(id);

    return this.formatQuestion(question);
  }

  // Create new question
  static create(data) {
    const { title, content, author, tags, campus, department } = data;

    const result = db
      .prepare(
        `
      INSERT INTO questions (title, content, author, tags, campus, department)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      )
      .run(
        title,
        content,
        author || "Anonymous Iskolar",
        JSON.stringify(tags),
        campus,
        department,
      );

    return this.getById(result.lastInsertRowid);
  }

  // Update vote
  static vote(id, direction) {
    const change = direction === "up" ? 1 : -1;

    db.prepare(
      `
      UPDATE questions
      SET votes = votes + ?, updated_at = (datetime('now', 'localtime'))
      WHERE id = ?
    `,
    ).run(change, id);

    return this.getById(id);
  }

  // Add comment
  static addComment(questionId, data) {
    const { text, author } = data;

    db.prepare(
      `
      INSERT INTO comments (question_id, text, author)
      VALUES (?, ?, ?)
    `,
    ).run(questionId, text, author || "Anonymous Iskolar");

    // Update question updated_at
    db.prepare(
      `
      UPDATE questions
      SET updated_at = (datetime('now', 'localtime'))
      WHERE id = ?
    `,
    ).run(questionId);

    return this.getById(questionId);
  }

  // Delete question
  static delete(id) {
    const result = db
      .prepare(
        `
      DELETE FROM questions WHERE id = ?
    `,
      )
      .run(id);

    return result.changes > 0;
  }

  // Delete comment
  static deleteComment(questionId, commentId) {
    // Check if question exists
    const question = db
      .prepare(
        `
        SELECT * FROM questions WHERE id = ?
      `,
      )
      .get(questionId);

    if (!question) return null;

    // Delete the comment
    const result = db
      .prepare(
        `
        DELETE FROM comments
        WHERE id = ? AND question_id = ?
      `,
      )
      .run(commentId, questionId);

    if (result.changes === 0) {
      return null; // Comment not found
    }

    // Update question updated_at
    db.prepare(
      `
        UPDATE questions
        SET updated_at = (datetime('now', 'localtime'))
        WHERE id = ?
      `,
    ).run(questionId);

    return this.getById(questionId);
  }

  // Search questions
  static search(query, tags) {
    let sql = "SELECT * FROM questions WHERE 1=1";
    const params = [];

    if (query) {
      sql += " AND (title LIKE ? OR content LIKE ?)";
      const searchTerm = `%${query}%`;
      params.push(searchTerm, searchTerm);
    }

    if (tags && tags.length > 0) {
      const tagConditions = tags.map(() => "tags LIKE ?").join(" OR ");
      sql += ` AND (${tagConditions})`;
      tags.forEach((tag) => params.push(`%${tag}%`));
    }

    sql += " ORDER BY created_at DESC";

    const questions = db.prepare(sql).all(...params);
    return questions.map((q) => this.formatQuestion(q));
  }
}

module.exports = Question;
