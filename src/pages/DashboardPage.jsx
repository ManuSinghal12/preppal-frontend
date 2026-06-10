import { useProblems } from "../hooks/useProblems"
import StatCard from "../components/dashboard/StatCard"
import TopicBarChart from "../components/dashboard/TopicBarChart"
import DifficultyPieChart from "../components/dashboard/DifficultyPieChart"
import WeakTopics from "../components/dashboard/WeakTopics"
import RevisionQueue from "../components/revision/RevisionQueue"

const DashboardPage = () => {
    const { problems, loading, error, refetch } = useProblems()

    const today = new Date(); today.setHours(23, 59, 59, 999)
    const stats = {
        total: problems.length,
        solved: problems.filter(p => p.status === "Solved").length,
        backlog: problems.filter(p =>
            p.status === "Stuck" || (p.nextRevisionDate && new Date(p.nextRevisionDate) <= today)
        ).length,
        starred: problems.filter(p => p.isStarred).length
    }

    if (loading) return <div className="flex items-center justify-center py-16 text-slate-400">Loading dashboard...</div>

    return (
        <div className="page">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}

            <div className="flex gap-4 flex-wrap mb-8">
                <StatCard label="Total problems" value={stats.total} />
                <StatCard label="Solved" value={stats.solved} color="#22c55e" />
                <StatCard label="Backlog" value={stats.backlog} color="#f59e0b" />
                <StatCard label="Starred" value={stats.starred} color="#f59e0b" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="card p-6">
                    <TopicBarChart problems={problems} />
                </div>
                <div className="card p-6">
                    <DifficultyPieChart problems={problems} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6">
                    <WeakTopics problems={problems} />
                </div>
                <div className="card p-6">
                    <RevisionQueue onRefresh={refetch} />
                </div>
            </div>
        </div>
    )
}
export default DashboardPage
