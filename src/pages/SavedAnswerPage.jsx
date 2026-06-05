import { useState, useEffect } from "react"
import { getSavedAnswers, deleteSavedAnswer } from "../api/savedAnswerApi"
import EmptyState from "../components/ui/EmptyState"

const SavedAnswersPage = () => {
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        getSavedAnswers().then(r => setAnswers(r.data)).finally(() => setLoading(false))
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this saved answer?")) return
        try { await deleteSavedAnswer(id); setAnswers(prev => prev.filter(a => a._id !== id)) }
        catch { alert("Failed to delete") }
    }

    const filtered = answers.filter(a =>
        a.question.toLowerCase().includes(search.toLowerCase()) ||
        a.answer.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
            <h2 style={{ marginBottom: 16 }}>Saved answers</h2>
            <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search questions and answers..."
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd", marginBottom: 20, fontSize: 14 }} />
            {loading ? <div style={{ color: "#888", padding: 20 }}>Loading...</div>
                : filtered.length === 0 ? <EmptyState message="No saved answers yet. Use the Save button in Ask my notes." />
                    : filtered.map(a => (
                        <div key={a._id} style={{ background: "white", border: "1px solid #eee", borderRadius: 10, padding: 16, marginBottom: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                <p style={{ fontWeight: 500, fontSize: 14, margin: 0, flex: 1, marginRight: 12 }}>{a.question}</p>
                                <button onClick={() => handleDelete(a._id)}
                                    style={{ padding: "2px 10px", cursor: "pointer", borderRadius: 4, border: "1px solid #fcc", color: "#c33", fontSize: 12, flexShrink: 0 }}>Delete</button>
                            </div>
                            <p style={{ margin: "0 0 6px", fontSize: 13, color: "#555", lineHeight: 1.6 }}>{a.answer.substring(0, 300)}{a.answer.length > 300 ? "..." : ""}</p>
                            {a.noteTitle && <p style={{ margin: 0, fontSize: 11, color: "#aaa" }}>From: {a.noteTitle}</p>}
                        </div>
                    ))
            }
        </div>
    )
}
export default SavedAnswersPage