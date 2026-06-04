import { useState } from "react"
import { generateQuestions } from "../../api/aiAPI"

const TOPICS = ["Arrays", "Strings", "Linked List", "Trees", "Graphs", "DP", "Recursion", "OS", "DBMS", "CN", "OOPs", "System Design", "Other"]
const DIFFS = ["Beginner", "Intermediate", "Advanced"]
const TYPES = ["conceptual", "coding"]

const QuestionGenerator = () => {
    const [form, setForm] = useState({ topic: "Arrays", difficulty: "Intermediate", type: "conceptual" })
    const [questions, setQuestions] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleGenerate = async () => {
        setLoading(true); setError(""); setQuestions("")
        try {
            const { data } = await generateQuestions(form)
            setQuestions(data.questions)
        } catch (err) {
            setError(err.response?.data?.message || "Generation failed")
        } finally { setLoading(false) }
    }

    return (
        <div>
            <h3 style={{ marginBottom: 16, fontSize: 17 }}>Generate interview questions</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
                {[["topic", TOPICS], ["difficulty", DIFFS], ["type", TYPES]].map(([name, opts]) => (
                    <div key={name}>
                        <label style={{ fontSize: 12, color: "#888", textTransform: "capitalize", display: "block", marginBottom: 4 }}>{name}</label>
                        <select name={name} value={form[name]} onChange={handleChange}
                            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}>
                            {opts.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                ))}
            </div>
            <button onClick={handleGenerate} disabled={loading}
                style={{ padding: "8px 20px", cursor: "pointer", fontWeight: 500, borderRadius: 6, border: "1px solid #ccc", marginBottom: 16 }}>
                {loading ? "Generating..." : "Generate 5 questions"}
            </button>
            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            {questions && (
                <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
                    <p style={{ margin: "0 0 10px", fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>
                        {form.difficulty} {form.type} — {form.topic}
                    </p>
                    <div style={{ fontSize: 14, lineHeight: 1.85, whiteSpace: "pre-wrap", color: "#333" }}>{questions}</div>
                </div>
            )}
        </div>
    )
}
export default QuestionGenerator
