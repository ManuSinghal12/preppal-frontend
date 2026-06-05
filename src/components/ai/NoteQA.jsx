import { useState, useEffect } from "react"
import { getAllNotes } from "../../api/noteApi"
import { askNote } from "../../api/aiAPI"
import { saveAnswer } from "../../api/savedAnswerApi"
import { parseMarkdown } from "../../utils/parseMarkdown"

const NoteQA = () => {
    const [notes, setNotes] = useState([])
    const [noteId, setNoteId] = useState("")
    const [question, setQ] = useState("")
    const [answer, setAnswer] = useState(null)
    const [chunks, setChunks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState("")

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

    const handleSave = async () => {
        if (!answer || !question) return
        setSaving(true); setSaveSuccess("")
        try {
            const noteTitle = notes.find(n => n._id === noteId)?.title || "Unknown"
            await saveAnswer({ question, answer, noteId, noteTitle })
            setSaveSuccess("Answer saved! ✓")
            setTimeout(() => setSaveSuccess(""), 3000)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save answer")
        } finally { setSaving(false) }
    }

    if (notes.length === 0) return (
        <div className="text-slate-400 py-8">
            No notes uploaded yet. Go to the Notes page and upload a PDF or text file first.
        </div>
    )

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Ask your notes</h3>
            <div className="mb-4">
                <label className="label">Select note</label>
                <select value={noteId} onChange={e => setNoteId(e.target.value)}
                    className="input">
                    {notes.map(n => <option key={n._id} value={n._id}>{n.title} — {n.subject}</option>)}
                </select>
            </div>
            <div className="mb-4">
                <label className="label">Your question</label>
                <textarea value={question} onChange={e => setQ(e.target.value)}
                    placeholder="What is a deadlock? Explain normalisation..."
                    rows={3} className="input" />
            </div>
            <button onClick={handleAsk} disabled={loading || !question.trim()}
                className="btn-primary mb-4">
                {loading ? "Thinking..." : "Ask"}
            </button>
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            {saveSuccess && <p className="text-green-600 text-sm mb-3">{saveSuccess}</p>}
            {answer && (
                <div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                        <p className="text-xs text-blue-700 font-semibold uppercase mb-2">Answer</p>
                        <p className="text-sm leading-relaxed">{parseMarkdown(answer)}</p>
                    </div>
                    <button onClick={handleSave} disabled={saving}
                        className="btn-primary mb-4">
                        {saving ? "Saving..." : "Save Answer"}
                    </button>
                    {chunks.length > 0 && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                            <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Source chunks used</p>
                            {chunks.map((c, i) => (
                                <div key={i} className="text-xs text-slate-600 py-1.5" style={{ borderBottom: i < chunks.length - 1 ? "1px solid #e2e8f0" : "none" }}>
                                    <span className="text-slate-400 mr-1">{i + 1}.</span>{c.text}...
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
