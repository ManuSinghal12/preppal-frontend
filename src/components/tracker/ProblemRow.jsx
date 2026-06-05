// components/tracker/ProblemRow.jsx
import { deleteProblem, toggleStar } from "../../api/problemApi"
import { useToast } from "../../context/ToastContext"

const D_COLORS = { Easy: "#22c55e", Medium: "#f59e0b", Hard: "#ef4444" }
const S_COLORS = { Solved: "#22c55e", Stuck: "#ef4444", Revise: "#f59e0b", "To Do": "#888" }

const ProblemRow = ({ problem, onEdit, onDelete, onToggleStar }) => {
    const { addToast } = useToast()
    const handleDelete = async () => {
        if (!window.confirm("Delete this problem?")) return
        try { await deleteProblem(problem._id); onDelete(problem._id); addToast("Problem deleted") }
        catch { addToast("Failed to delete", "error") }
    }
    const handleStar = async () => {
        try { const { data } = await toggleStar(problem._id); onToggleStar(data) }
        catch { addToast("Failed to update star", "error") }
    }
    return (
        <tr className="border-b border-slate-200 hover:bg-slate-50">
            <td className="px-3 py-2.5">
                <button onClick={handleStar} className="bg-none border-none cursor-pointer text-lg hover:opacity-80">
                    {problem.isStarred ? "★" : "☆"}
                </button>
            </td>
            <td className="px-3 py-2.5 font-medium">{problem.title}</td>
            <td className="px-3 py-2.5 text-slate-600 text-sm">{problem.platform}</td>
            <td className="px-3 py-2.5 text-sm">{problem.topic}</td>
            <td className="px-3 py-2.5"><span style={{ color: D_COLORS[problem.difficulty] || "#888" }}>{problem.difficulty}</span></td>
            <td className="px-3 py-2.5"><span style={{ color: S_COLORS[problem.status] || "#888" }}>{problem.status}</span></td>
            <td className="px-3 py-2.5 text-slate-600 text-xs">
                {problem.dateSolved ? new Date(problem.dateSolved).toLocaleDateString() : "—"}
            </td>
            <td className="px-3 py-2.5 flex gap-1.5">
                <button onClick={() => onEdit(problem)} className="btn-secondary px-2 py-1 text-xs">Edit</button>
                <button onClick={handleDelete} className="btn-danger">Delete</button>
            </td>
        </tr>
    )
}
export default ProblemRow