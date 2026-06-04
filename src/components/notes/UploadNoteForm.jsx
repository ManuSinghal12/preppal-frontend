import { useState, useRef } from "react"
import { uploadNote } from "../../api/noteApi"

const UploadNoteForm = ({ onSuccess }) => {
    const [form, setForm] = useState({ title: "", subject: "", tags: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [status, setStatus] = useState("")
    const fileRef = useRef(null)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        const file = fileRef.current?.files[0]
        if (!file) { setError("Please select a PDF or .txt file"); return }
        setError(""); setLoading(true); setStatus("Uploading and processing file...")
        const fd = new FormData()
        fd.append("file", file)
        fd.append("title", form.title)
        fd.append("subject", form.subject)
        fd.append("tags", form.tags)
        try {
            await uploadNote(fd)
            setForm({ title: "", subject: "", tags: "" })
            if (fileRef.current) fileRef.current.value = ""
            setStatus(""); onSuccess()
        } catch (err) {
            setError(err.response?.data?.message || "Upload failed")
            setStatus("")
        } finally { setLoading(false) }
    }

    return (
        <div style={{ background: "var(--color-background-secondary)", border: "1px solid #eee", borderRadius: 8, padding: 20, marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 14px" }}>Upload notes</h3>
            {error && <p style={{ color: "red", fontSize: 13, marginBottom: 8 }}>{error}</p>}
            {status && <p style={{ color: "#666", fontSize: 13, marginBottom: 8 }}>{status}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                        <label style={{ fontSize: 12, color: "#888" }}>Title *</label>
                        <input name="title" value={form.title} onChange={handleChange} required
                            style={{ display: "block", width: "100%", padding: 8, marginTop: 3, borderRadius: 6, border: "1px solid #ddd" }} />
                    </div>
                    <div>
                        <label style={{ fontSize: 12, color: "#888" }}>Subject *</label>
                        <input name="subject" value={form.subject} onChange={handleChange} required
                            style={{ display: "block", width: "100%", padding: 8, marginTop: 3, borderRadius: 6, border: "1px solid #ddd" }} />
                    </div>
                    <div>
                        <label style={{ fontSize: 12, color: "#888" }}>Tags (comma-separated)</label>
                        <input name="tags" value={form.tags} onChange={handleChange} placeholder="DBMS, OS, networks"
                            style={{ display: "block", width: "100%", padding: 8, marginTop: 3, borderRadius: 6, border: "1px solid #ddd" }} />
                    </div>
                    <div>
                        <label style={{ fontSize: 12, color: "#888" }}>File (.pdf or .txt) *</label>
                        <input type="file" accept=".pdf,.txt" ref={fileRef}
                            style={{ display: "block", width: "100%", padding: 6, marginTop: 3 }} />
                    </div>
                </div>
                <button type="submit" disabled={loading}
                    style={{ marginTop: 14, padding: "8px 20px", cursor: "pointer", fontWeight: 500, borderRadius: 6, border: "1px solid #ccc" }}>
                    {loading ? "Processing..." : "Upload"}
                </button>
            </form>
        </div>
    )
}
export default UploadNoteForm