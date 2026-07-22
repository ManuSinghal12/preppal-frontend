import { useState } from "react"
import { updateProblem } from "../../api/problemApi"
import { useToast } from "../../context/ToastContext"
import Modal from "../ui/Modal"

const TOPICS = ["Arrays", "Strings", "Linked List", "Stack-Queue", "Trees", "Graphs", "DP", "Recursion", "Sorting", "Binary Search", "Greedy", "Heap", "Other"]
const PLATS = ["LeetCode", "GFG", "HackerRank", "CodeForces", "Other"]
const DIFFS = ["Easy", "Medium", "Hard"]
const STATS = ["To Do", "Solved", "Stuck"]

const EditProblemModal = ({ problem, onClose, onSave }) => {
    const { addToast } = useToast()
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
            addToast("Problem updated!"); onSave(); onClose()
        } catch (err) {
            const errMsg = err.response?.data?.message || "Failed to update"
            setError(errMsg)
            addToast(errMsg, "error")
        } finally { setLoading(false) }
    }

    return (
        <Modal onClose={onClose}>
            <div className="sm:max-w-xl w-full">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Edit Problem Details</h3>
                {error && <p className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <label className="inline-block px-3 py-1 bg-slate-100 border-l-4 border-brand-500 text-sm font-black text-slate-900 mb-2 uppercase tracking-wide">Problem Title</label>
                        <input name="title" value={form.title} onChange={handleChange}
                            className="input w-full mt-1 focus:ring-2 focus:ring-brand-500" />
                    </div>
                    {[["platform", PLATS], ["topic", TOPICS], ["difficulty", DIFFS], ["status", STATS]].map(([name, opts]) => (
                        <div key={name}>
                            <label className="inline-block px-3 py-1 bg-slate-100 border-l-4 border-brand-500 text-xs font-black text-slate-900 mb-2 uppercase tracking-wide">{name}</label>
                            <select name={name} value={form[name]} onChange={handleChange}
                                className="input w-full mt-1 focus:ring-2 focus:ring-brand-500">
                                {opts.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                    ))}
                    <div className="md:col-span-2">
                        <label className="inline-block px-3 py-1 bg-slate-100 border-l-4 border-brand-500 text-sm font-black text-slate-900 mb-2 uppercase tracking-wide">Personal Notes</label>
                        <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                            className="input w-full mt-1 focus:ring-2 focus:ring-brand-500" placeholder="Approach, edge cases, or optimizations..." />
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-end gap-3 border-t pt-6 border-slate-100">
                    <button onClick={onClose} className="btn-secondary px-6">Cancel</button>
                    <button onClick={handleSave} disabled={loading} className="btn-primary px-8 min-w-[120px]">
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
export default EditProblemModal