import axios from "axios";

export const api = axios.create({
  URL: "http://localhost:9192/api/quizzies",
});

export const createQuestion = async (quizQuestion) => {
  try {
    const response = await api.post("/create-new-question", quizQuestion);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllQuestion = async () => {
  try {
    const response = await api.get("/all-questions");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchQuizforUser = async (number, subject) => {
  try {
    const response = await api.get(
      `/quiz/fetch-question-for-user?numOfQuestions=${number}&subject=${subject}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSubject = async () => {
  try {
    const response = await api.get("/subjects");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateQuestion = async (id, question) => {
  try {
    const response = await api.put(`question/${id}/update`, question);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getQuestionById = async (id) => {
  try {
    const response = await api.get(`/question/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteQuestion = async (id) => {
  try {
    const response = await api.delete(`/question/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};