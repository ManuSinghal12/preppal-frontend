import instance from "./axiosInstance"

export const getAllProblems = (params) => instance.get("/api/problems", { params })
export const createProblem = (data) => instance.post("/api/problems", data)
export const updateProblem = (id, data) => instance.put(`/api/problems/${id}`, data)
export const deleteProblem = (id) => instance.delete(`/api/problems/${id}`)
export const toggleStar = (id) => instance.patch(`/api/problems/${id}/star`)
