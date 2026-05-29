import instance from "./axiosInstance"

export const signup = (data) => instance.post("/api/auth/signup", data)
export const login = (data) => instance.post("/api/auth/login", data)
export const getProfile = () => instance.get("/api/auth/profile")
export const updateProfile = (data) => instance.put("/api/auth/profile", data)