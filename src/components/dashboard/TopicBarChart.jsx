import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const TopicBarChart = ({ problems }) => {
    const counts = problems.reduce((acc, p) => {
        acc[p.topic] = (acc[p.topic] || 0) + 1
        return acc
    }, {})
    const data = Object.entries(counts)
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count)

    if (!data.length) return <div style={{ color: "#888", padding: 20, fontSize: 14 }}>Add problems to see chart</div>

    return (
        <div>
            <h3 style={{ fontSize: 16, marginBottom: 12 }}>Problems by topic</h3>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="topic" tick={{ fontSize: 11 }} angle={-40} textAnchor="end" />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default TopicBarChart