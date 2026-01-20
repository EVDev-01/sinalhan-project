const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getTags = async () => {
  try {
    const response = await fetch(`${API_URL}/questions/tags`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCampuses = async () => {
  try {
    const response = await fetch(`${API_URL}/questions/campuses`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDepartments = async () => {
  try {
    const response = await fetch(`${API_URL}/questions/departments`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchQuestions = async (query, tags) => {
  try {
    let url = `${API_URL}/questions/search?`;
    if (query) url += `q=${encodeURIComponent(query)}&`;
    if (tags && tags.length > 0) url += `tags=${tags.join(",")}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getQuestions = async () => {
  try {
    const response = await fetch(`${API_URL}/questions`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getQuestion = async (questionId) => {
  try {
    const response = await fetch(`${API_URL}/questions/${questionId}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postQuestion = async (questionData) => {
  try {
    const response = await fetch(`${API_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await fetch(`${API_URL}/questions/${questionId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const voteQuestion = async (questionId, direction) => {
  try {
    const response = await fetch(`${API_URL}/questions/${questionId}/vote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ direction }), // 'up' or 'down'
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addComment = async (questionId, commentData) => {
  try {
    const response = await fetch(
      `${API_URL}/questions/${questionId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      },
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Deletes a specific comment from a question.
 * @param {string|number} questionId - The ID of the parent question.
 * @param {string|number} commentId - The ID of the comment to delete.
 */
export const deleteComment = async (questionId, commentId) => {
  // Debugging: Check if the IDs are coming in correctly
  console.log(`Deleting comment: ${commentId} from question: ${questionId}`);

  if (!questionId || !commentId) {
    throw new Error("Missing questionId or commentId");
  }

  try {
    const response = await fetch(
      `${API_URL}/questions/${questionId}/comments/${commentId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      // Provide more detail in the error if the server fails
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || response.statusText);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("API Error in deleteComment:", error);
    throw error;
  }
};
