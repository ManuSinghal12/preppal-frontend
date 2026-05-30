import ProblemRow from "./ProblemRow"
import EmptyState from "../ui/EmptyState"

const HEADERS = ["★", "Title", "Platform", "Topic", "Difficulty", "Status", "Date Solved", "Actions"]

const ProblemList = ({ problems, loading, onEdit, onDelete, onToggleStar }) => {
    if (loading) return <div style={{ padding: 20, textAlign: "center", color: "#888" }}>Loading problems...</div>
    if (!problems.length) return <EmptyState message="No problems yet. Add your first one above." />
    return (
        <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                    <tr style={{ background: "var(--color-background-secondary)", textAlign: "left" }}>
                        {HEADERS.map(h => (
                            <th key={h} style={{ padding: "10px 8px", fontWeight: 600, borderBottom: "2px solid #eee", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {problems.map(p => (
                        <ProblemRow key={p._id} problem={p} onEdit={onEdit} onDelete={onDelete} onToggleStar={onToggleStar} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ProblemList