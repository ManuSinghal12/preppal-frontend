const WeakTopics = ({ problems }) => {
    const weakMap = problems.reduce((acc, p) => {
        if (p.status === "Stuck" || p.status === "Revise")
            acc[p.topic] = (acc[p.topic] || 0) + 1
        return acc
    }, {})
    const weak = Object.entries(weakMap).filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1])

    if (!weak.length) return (
        <div style={{ fontSize: 13, color: "#888", padding: "12px 0" }}>No weak topics detected yet — keep adding problems.</div>
    )
    return (
        <div>
            <h3 style={{ fontSize: 16, marginBottom: 10 }}>Weak topics</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {weak.map(([topic, count]) => (
                    <span key={topic} style={{ padding: "4px 12px", background: "#fff3cd", border: "1px solid #ffd66b", borderRadius: 99, fontSize: 13, color: "#7d5f00" }}>
                        {topic} ({count})
                    </span>
                ))}
            </div>
        </div>
    )
}
export default WeakTopics
