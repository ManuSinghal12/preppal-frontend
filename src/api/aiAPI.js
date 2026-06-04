import instance from "./axiosInstance"

export const askNote = (data) => instance.post("/api/ai/ask", data)
export const generateQuestions = (data) => instance.post("/api/ai/generate-questions", data)