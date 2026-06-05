import { useState, useEffect } from "react"
import { getSavedAnswers, deleteSavedAnswer } from "../api/savedAnswerApi"
import { useToast } from "../context/ToastContext"
import EmptyState from "../components/ui/EmptyState"

const SavedAnswersPage = () => {
    const { addToast } = useToast()
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        getSavedAnswers().then(r => setAnswers(r.data)).finally(() => setLoading(false))
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this saved answer?")) return
        try { await deleteSavedAnswer(id); setAnswers(prev => prev.filter(a => a._id !== id)); addToast("Answer deleted") }
        catch { addToast("Failed to delete", "error") }
    }

    const filtered = answers.filter(a =>
        a.question.toLowerCase().includes(search.toLowerCase()) ||
        a.answer.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="page max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Saved answers</h2>
            <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search questions and answers..."
                className="input mb-6" />
            {loading ? <div className="text-slate-400 py-8">Loading...</div>
                : filtered.length === 0 ? <EmptyState message="No saved answers yet. Use the Save button in Ask my notes." />
                    : filtered.map(a => (
                        <div key={a._id} className="card p-4 mb-3">
                            <div className="flex justify-between items-start mb-2">
                                <p className="font-medium text-sm flex-1 mr-3">{a.question}</p>
                                <button onClick={() => handleDelete(a._id)}
                                    className="btn-danger text-xs flex-shrink-0">Delete</button>
                            </div>
                            <p className="text-sm text-slate-600 mb-2 leading-relaxed">{a.answer.substring(0, 300)}{a.answer.length > 300 ? "..." : ""}</p>
                            {a.noteTitle && <p className="text-xs text-slate-400">From: {a.noteTitle}</p>}
                        </div>
                    ))
            }
        </div>
    )
}
export default SavedAnswersPage