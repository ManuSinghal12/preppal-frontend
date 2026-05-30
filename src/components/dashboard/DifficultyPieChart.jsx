import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = { Easy: "#22c55e", Medium: "#f59e0b", Hard: "#ef4444" }

const DifficultyPieChart = ({ problems }) => {
    const counts = problems.reduce((acc, p) => {
        acc[p.difficulty] = (acc[p.difficulty] || 0) + 1
        return acc
    }, {})
    const data = Object.entries(counts).map(([name, value]) => ({ name, value }))

    if (!data.length) return <div style={{ color: "#888", padding: 20, fontSize: 14 }}>Add problems to see chart</div>

    const RADIAN = Math.PI / 180
    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) => {
        const r = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + r * Math.cos(-midAngle * RADIAN)
        const y = cy + r * Math.sin(-midAngle * RADIAN)
        return percent > 0.05 ? (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
                {name} {Math.round(percent * 100)}%
            </text>
        ) : null
    }

    return (
        <div>
            <h3 style={{ fontSize: 16, marginBottom: 12 }}>Difficulty split</h3>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>
                        {data.map(entry => <Cell key={entry.name} fill={COLORS[entry.name] || "#888"} />)}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
export default DifficultyPieChart