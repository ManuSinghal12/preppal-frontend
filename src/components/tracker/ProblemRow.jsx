// components/tracker/ProblemRow.jsx
import { deleteProblem, toggleStar } from "../../api/problemApi"

const D_COLORS = { Easy: "#22c55e", Medium: "#f59e0b", Hard: "#ef4444" }
const S_COLORS = { Solved: "#22c55e", Stuck: "#ef4444", Revise: "#f59e0b", "To Do": "#888" }

const ProblemRow = ({ problem, onEdit, onDelete, onToggleStar }) => {
    const handleDelete = async () => {
        if (!window.confirm("Delete this problem?")) return
        try { await deleteProblem(problem._id); onDelete(problem._id) }
        catch { alert("Failed to delete") }
    }
    const handleStar = async () => {
        try { const { data } = await toggleStar(problem._id); onToggleStar(data) }
        catch { alert("Failed to update star") }
    }
    return (
        <tr style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: "10px 8px" }}>
                <button onClick={handleStar} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>
                    {problem.isStarred ? "★" : "☆"}
                </button>
            </td>
            <td style={{ padding: "10px 8px", fontWeight: 500 }}>{problem.title}</td>
            <td style={{ padding: "10px 8px", color: "#666", fontSize: 13 }}>{problem.platform}</td>
            <td style={{ padding: "10px 8px", fontSize: 13 }}>{problem.topic}</td>
            <td style={{ padding: "10px 8px" }}><span style={{ color: D_COLORS[problem.difficulty] || "#888" }}>{problem.difficulty}</span></td>
            <td style={{ padding: "10px 8px" }}><span style={{ color: S_COLORS[problem.status] || "#888" }}>{problem.status}</span></td>
            <td style={{ padding: "10px 8px", color: "#666", fontSize: 12 }}>
                {problem.dateSolved ? new Date(problem.dateSolved).toLocaleDateString() : "—"}
            </td>
            <td style={{ padding: "10px 8px" }}>
                <button onClick={() => onEdit(problem)} style={{ marginRight: 6, padding: "3px 10px", cursor: "pointer", borderRadius: 4, border: "1px solid #ddd" }}>Edit</button>
                <button onClick={handleDelete} style={{ padding: "3px 10px", cursor: "pointer", borderRadius: 4, border: "1px solid #fcc", color: "#c33" }}>Delete</button>
            </td>
        </tr>
    )
}
export default ProblemRow