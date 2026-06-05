import instance from "./axiosInstance"

export const askNote = (data) => instance.post("/api/ai/ask", data)
export const generateQuestions = (data) => instance.post("/api/ai/generate-questions", data)
export const explainConcept = (data) => instance.post("/api/ai/explain", data)
export const getPrepSummary = () => instance.get("/api/ai/prep-summary")
export const mockInterview = (data) => instance.post("/api/ai/mock-interview", data)