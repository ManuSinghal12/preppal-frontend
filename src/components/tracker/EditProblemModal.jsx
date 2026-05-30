import { useState } from "react"
import { updateProblem } from "../../api/problemApi"
import Modal from "../ui/Modal"

const TOPICS = ["Arrays", "Strings", "Linked List", "Stack-Queue", "Trees", "Graphs", "DP", "Recursion", "Sorting", "Binary Search", "Greedy", "Heap", "Other"]
const PLATS = ["LeetCode", "GFG", "HackerRank", "CodeForces", "Other"]
const DIFFS = ["Easy", "Medium", "Hard"]
const STATS = ["To Do", "Solved", "Stuck", "Revise"]

const EditProblemModal = ({ problem, onClose, onSave }) => {
    const [form, setForm] = useState({
        title: problem.title,
        platform: problem.platform,
        topic: problem.topic,
        difficulty: problem.difficulty,
        status: problem.status,
        notes: problem.notes || "",
        dateSolved: problem.dateSolved ? problem.dateSolved.split("T")[0] : ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSave = async () => {
        setLoading(true); setError("")
        try {
            await updateProblem(problem._id, form)
            onSave(); onClose()
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update")
        } finally { setLoading(false) }
    }

    return (
        <Modal onClose={onClose}>
            <h3 style={{ margin: "0 0 16px" }}>Edit problem</h3>
            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: 12, color: "#888" }}>Title</label>
                    <input name="title" value={form.title} onChange={handleChange}
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
                <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: 12, color: "#888" }}>Notes</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={2}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 3, borderRadius: 6, border: "1px solid #ddd" }} />
                </div>
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                <button onClick={handleSave} disabled={loading} style={{ padding: "8px 20px", cursor: "pointer", fontWeight: 500, borderRadius: 6, border: "1px solid #ccc" }}>
                    {loading ? "Saving..." : "Save changes"}
                </button>
                <button onClick={onClose} style={{ padding: "8px 14px", cursor: "pointer", borderRadius: 6, border: "1px solid #ddd" }}>Cancel</button>
            </div>
        </Modal>
    )
}
export default EditProblemModal