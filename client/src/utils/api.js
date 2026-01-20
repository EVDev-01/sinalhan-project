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

export const getQuestion = async (id) => {
  try {
    const response = await fetch(`${API_URL}/questions/${id}`);
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

export const deleteQuestion = async (id) => {
  try {
    const response = await fetch(`${API_URL}/questions/${id}`, {
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

export const voteQuestion = async (id, direction) => {
  try {
    const response = await fetch(`${API_URL}/questions/${id}/vote`, {
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

export const addComment = async (id, commentData) => {
  try {
    const response = await fetch(`${API_URL}/questions/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
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
