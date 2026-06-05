import { useState } from "react"
import { updateProblem } from "../../api/problemApi"
import { useToast } from "../../context/ToastContext"
import Modal from "../ui/Modal"

const TOPICS = ["Arrays", "Strings", "Linked List", "Stack-Queue", "Trees", "Graphs", "DP", "Recursion", "Sorting", "Binary Search", "Greedy", "Heap", "Other"]
const PLATS = ["LeetCode", "GFG", "HackerRank", "CodeForces", "Other"]
const DIFFS = ["Easy", "Medium", "Hard"]
const STATS = ["To Do", "Solved", "Stuck", "Revise"]

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
            <h3 className="text-lg font-semibold mb-4">Edit problem</h3>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="label">Title</label>
                    <input name="title" value={form.title} onChange={handleChange}
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
                <div className="md:col-span-2">
                    <label className="label">Notes</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={2}
                        className="input" />
                </div>
            </div>
            <div className="mt-6 flex gap-2">
                <button onClick={handleSave} disabled={loading} className="btn-primary">
                    {loading ? "Saving..." : "Save changes"}
                </button>
                <button onClick={onClose} className="btn-secondary">Cancel</button>
            </div>
        </Modal>
    )
}
export default EditProblemModal