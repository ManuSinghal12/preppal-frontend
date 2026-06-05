import instance from "./axiosInstance"

export const getSavedAnswers = () => instance.get("/api/saved-answers")
export const saveAnswer = (d) => instance.post("/api/saved-answers", d)
export const deleteSavedAnswer = (id) => instance.delete(`/api/saved-answers/${id}`)