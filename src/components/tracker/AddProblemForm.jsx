import { useState } from "react"
import { createProblem } from "../../api/problemApi"
import { useToast } from "../../context/ToastContext"

const TOPICS = ["Arrays", "Strings", "Linked List", "Stack-Queue", "Trees", "Graphs", "DP", "Recursion", "Sorting", "Binary Search", "Greedy", "Heap", "Other"]
const PLATS = ["LeetCode", "GFG", "HackerRank", "CodeForces", "Other"]
const DIFFS = ["Easy", "Medium", "Hard"]
const STATS = ["To Do", "Solved", "Stuck"]
const EMPTY = { title: "", platform: "LeetCode", topic: "Arrays", difficulty: "Medium", status: "To Do", notes: "", dateSolved: "" }

const AddProblemForm = ({ onSuccess }) => {
    const { addToast } = useToast()
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
            setForm(EMPTY); setOpen(false); addToast("Problem added!"); onSuccess()
        } catch (err) {
            const errMsg = err.response?.data?.message || "Failed to add problem"
            setError(errMsg)
            addToast(errMsg, "error")
        } finally { setLoading(false) }
    }

    if (!open) return (
        <button onClick={() => setOpen(true)} className="btn-primary mb-6">+ Add problem</button>
    )
    return (
        <div className="card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Add a problem</h3>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="label">Title *</label>
                        <input name="title" value={form.title} onChange={handleChange} required
                            className="input" />
                    </div>
                    {[["platform", PLATS], ["topic", TOPICS], ["difficulty", DIFFS], ["status", STATS]].map(([name, opts]) => (
                        <div key={name}>
                            <label className="label capitalize">{name}</label>
                            <select name={name} value={form[name]} onChange={handleChange}
                                className="input">
                                {opts.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                    ))}
                    <div>
                        <label className="label">Date solved</label>
                        <input type="date" name="dateSolved" value={form.dateSolved} onChange={handleChange}
                            className="input" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label">Notes</label>
                        <textarea name="notes" value={form.notes} onChange={handleChange} rows={2}
                            className="input" />
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? "Adding..." : "Add problem"}
                    </button>
                    <button type="button" onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default AddProblemForm