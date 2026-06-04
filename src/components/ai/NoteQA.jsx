import { useState, useEffect } from "react"
import { getAllNotes } from "../../api/noteApi"
import { askNote } from "../../api/aiAPI"

const NoteQA = () => {
    const [notes, setNotes] = useState([])
    const [noteId, setNoteId] = useState("")
    const [question, setQ] = useState("")
    const [answer, setAnswer] = useState(null)
    const [chunks, setChunks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        getAllNotes().then(res => {
            setNotes(res.data)
            if (res.data.length > 0) setNoteId(res.data[0]._id)
        })
    }, [])

    const handleAsk = async () => {
        if (!question.trim() || !noteId) return
        setLoading(true); setError(""); setAnswer(null); setChunks([])
        try {
            const { data } = await askNote({ question, noteId })
            setAnswer(data.answer)
            setChunks(data.chunksUsed)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to get answer")
        } finally { setLoading(false) }
    }

    if (notes.length === 0) return (
        <div style={{ padding: 20, color: "#888", fontSize: 14 }}>
            No notes uploaded yet. Go to the Notes page and upload a PDF or text file first.
        </div>
    )

    return (
        <div>
            <h3 style={{ marginBottom: 16, fontSize: 17 }}>Ask your notes</h3>
            <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 4 }}>Select note</label>
                <select value={noteId} onChange={e => setNoteId(e.target.value)}
                    style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}>
                    {notes.map(n => <option key={n._id} value={n._id}>{n.title} — {n.subject}</option>)}
                </select>
            </div>
            <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 4 }}>Your question</label>
                <textarea value={question} onChange={e => setQ(e.target.value)}
                    placeholder="What is a deadlock? Explain normalisation..."
                    rows={3} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd", resize: "vertical" }} />
            </div>
            <button onClick={handleAsk} disabled={loading || !question.trim()}
                style={{ padding: "8px 20px", cursor: "pointer", fontWeight: 500, borderRadius: 6, border: "1px solid #ccc", marginBottom: 16 }}>
                {loading ? "Thinking..." : "Ask"}
            </button>
            {error && <p style={{ color: "red", fontSize: 13, marginBottom: 10 }}>{error}</p>}
            {answer && (
                <div>
                    <div style={{ background: "#f0f7ff", border: "1px solid #cce0ff", borderRadius: 8, padding: 16, marginBottom: 10 }}>
                        <p style={{ margin: "0 0 6px", fontSize: 11, color: "#0066cc", fontWeight: 600, textTransform: "uppercase" }}>Answer</p>
                        <p style={{ margin: 0, lineHeight: 1.65, fontSize: 14, whiteSpace: "pre-wrap" }}>{answer}</p>
                    </div>
                    {chunks.length > 0 && (
                        <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: 8, padding: 14 }}>
                            <p style={{ margin: "0 0 8px", fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>Source chunks used</p>
                            {chunks.map((c, i) => (
                                <div key={i} style={{ fontSize: 12, color: "#666", padding: "6px 0", borderBottom: i < chunks.length - 1 ? "1px solid #eee" : "none" }}>
                                    <span style={{ color: "#bbb", marginRight: 6 }}>{i + 1}.</span>{c.text}...
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
export default NoteQA
