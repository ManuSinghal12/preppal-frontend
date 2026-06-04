import instance from "./axiosInstance"

export const getAllNotes = () => instance.get("/api/notes")
export const deleteNote = (id) => instance.delete(`/api/notes/${id}`)

export const uploadNote = (formData) =>
    instance.post("/api/notes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })