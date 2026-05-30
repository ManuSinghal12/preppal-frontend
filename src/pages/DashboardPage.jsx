import { useProblems } from "../hooks/useProblems"
import StatCard from "../components/dashboard/StatCard"
import TopicBarChart from "../components/dashboard/TopicBarChart"
import DifficultyPieChart from "../components/dashboard/DifficultyPieChart"
import WeakTopics from "../components/dashboard/WeakTopics"
import RevisionQueue from "../components/revision/RevisionQueue"

const DashboardPage = () => {
    const { problems, loading, error } = useProblems()

    const today = new Date(); today.setHours(23, 59, 59, 999)
    const stats = {
        total: problems.length,
        solved: problems.filter(p => p.status === "Solved").length,
        backlog: problems.filter(p => p.nextRevisionDate && new Date(p.nextRevisionDate) <= today).length,
        starred: problems.filter(p => p.isStarred).length
    }

    if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading dashboard...</div>

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}>
            <h2 style={{ marginBottom: 24 }}>Dashboard</h2>

            {error && <p style={{ color: "#991b1b", background: "#fef2f2", padding: 12, borderRadius: 8, marginBottom: 16 }}>{error}</p>}

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                <StatCard label="Total problems" value={stats.total} />
                <StatCard label="Solved" value={stats.solved} color="#22c55e" />
                <StatCard label="Backlog" value={stats.backlog} color="#f59e0b" />
                <StatCard label="Starred" value={stats.starred} color="#f59e0b" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div style={{ background: "var(--color-background-primary)", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
                    <TopicBarChart problems={problems} />
                </div>
                <div style={{ background: "var(--color-background-primary)", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
                    <DifficultyPieChart problems={problems} />
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ background: "var(--color-background-primary)", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
                    <WeakTopics problems={problems} />
                </div>
                <div style={{ background: "var(--color-background-primary)", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
                    <RevisionQueue />
                </div>
            </div>
        </div>
    )
}
export default DashboardPage
