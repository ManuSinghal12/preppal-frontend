import ProblemRow from "./ProblemRow"
import EmptyState from "../ui/EmptyState"

const HEADERS = ["★", "Title", "Platform", "Topic", "Difficulty", "Status", "Date Solved", "Actions"]

const ProblemList = ({ problems, loading, onEdit, onDelete, onToggleStar }) => {
    if (loading) return <div className="text-center text-slate-400 py-8">Loading problems...</div>
    if (!problems.length) return <EmptyState message="No problems yet. Add your first one above." />
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-slate-50">
                        {HEADERS.map(h => (
                            <th key={h} className="text-left px-3 py-2.5 font-semibold border-b border-slate-200 whitespace-nowrap">{h}</th>
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