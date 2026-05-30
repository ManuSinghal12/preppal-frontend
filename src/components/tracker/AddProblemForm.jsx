import { useState } from "react"
import { createProblem } from "../../api/problemApi"

const TOPICS = ["Arrays", "Strings", "Linked List", "Stack-Queue", "Trees", "Graphs", "DP", "Recursion", "Sorting", "Binary Search", "Greedy", "Heap", "Other"]
const PLATS = ["LeetCode", "GFG", "HackerRank", "CodeForces", "Other"]
const DIFFS = ["Easy", "Medium", "Hard"]
const STATS = ["To Do", "Solved", "Stuck", "Revise"]
const EMPTY = { title: "", platform: "LeetCode", topic: "Arrays", difficulty: "Medium", status: "To Do", notes: "", dateSolved: "" }

const AddProblemForm = ({ onSuccess }) => {
    const [form, setForm] = useState(EMPTY)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [open, setOpen] = useState(false)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        setError(""); setLoading(true)
        try {
            await createProblem(form)
            setForm(EMPTY); setOpen(false); onSuccess()
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add problem")
        } finally { setLoading(false) }
    }

    if (!open) return (
        <button onClick={() => setOpen(true)} style={{ marginBottom: 16, padding: "8px 18px", cursor: "pointer", fontWeight: 500, borderRadius: 6, border: "1px solid #ddd" }}>+ Add problem</button>
    )
    return (
        <div style={{ background: "var(--color-background-secondary)", border: "1px solid #eee", borderRadius: 8, padding: 20, marginBottom: 20 }}>
            <h3 style={{ margin: "0 0 14px" }}>Add a problem</h3>
            {error && <p style={{ color: "red", fontSize: 13, marginBottom: 10 }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={{ gridColumn: "1 / -1" }}>
                        <label style={{ fontSize: 12, color: "#888" }}>Title *</label>
                        <input name="title" value={form.title} onChange={handleChange} required
                            style={{ display: "block", width: "100%", padding: 8, marginTop: 3, borderRadius: 6, border: "1px solid #ddd" }} />
                    </div>
                    {[["platform", PLATS], ["topic", TOPICS], ["difficulty", DIFFS], ["status", STATS]].map(([name, opts]) => (
                        <div key={name}>
                            <label style={{ fontSize: 12, color: "#888", textTransform: "capitalize" }}>{name}</label>
                            <select name={name} value={form[name]} onChange={handleChange}
                                style={{ display: "block", width: "100%", padding: 8, marginTop: 3, borderRadius: 6, border: "1px solid #ddd" }}>
                                {opts.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                    ))}
                    <div>
                        <label style={{ fontSize: 12, color: "#888" }}>Date solved</label>
                        <input type="date" name="dateSolved" value={form.dateSolved} onChange={handleChange}
                            style={{ display: "block", width: "100%", padding: 8, marginTop: 3, borderRadius: 6, border: "1px solid #ddd" }} />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                        <label style={{ fontSize: 12, color: "#888" }}>Notes</label>
                        <textarea name="notes" value={form.notes} onChange={handleChange} rows={2}
                            style={{ display: "block", width: "100%", padding: 8, marginTop: 3, borderRadius: 6, border: "1px solid #ddd" }} />
                    </div>
                </div>
                <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                    <button type="submit" disabled={loading} style={{ padding: "8px 20px", cursor: "pointer", fontWeight: 500, borderRadius: 6, border: "1px solid #ccc" }}>
                        {loading ? "Adding..." : "Add problem"}
                    </button>
                    <button type="button" onClick={() => setOpen(false)} style={{ padding: "8px 16px", cursor: "pointer", borderRadius: 6, border: "1px solid #ddd" }}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default AddProblemForm