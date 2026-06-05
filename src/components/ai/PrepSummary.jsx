import { useState } from "react"
import { getPrepSummary } from "../../api/aiApi"
import { parseMarkdown } from "../../utils/parseMarkdown"

const PrepSummary = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleFetch = async () => {
        setLoading(true); setError("")
        try {
            const res = await getPrepSummary()
            setData(res.data)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch summary")
        } finally { setLoading(false) }
    }

    return (
        <div>
            <h3 style={{ marginBottom: 8, fontSize: 17 }}>Your prep summary</h3>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>
                AI analyses your actual tracker data and gives you a personalised coaching message.
            </p>
            <button onClick={handleFetch} disabled={loading}
                style={{ padding: "8px 20px", cursor: "pointer", fontWeight: 500, borderRadius: 6, border: "1px solid #ccc", marginBottom: 16 }}>
                {loading ? "Analysing your data..." : "Get my prep summary"}
            </button>
            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            {data && (
                <div>
                    <div style={{ background: "#f0f7ff", border: "1px solid #cce0ff", borderRadius: 8, padding: 16, marginBottom: 14 }}>
                        <p style={{ margin: "0 0 6px", fontSize: 11, color: "#0066cc", fontWeight: 600, textTransform: "uppercase" }}>AI Coaching</p>
                        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>{parseMarkdown(data.summary)}</p>
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {[
                            { label: "Total problems", value: data.stats.total, color: "#333" },
                            { label: "Solved", value: data.stats.solved, color: "#22c55e" },
                            { label: "Backlog", value: data.stats.backlog, color: "#f59e0b" },
                            { label: "Weak topics", value: data.stats.weakTopics?.length || 0, color: "#ef4444" }
                        ].map(s => (
                            <div key={s.label} style={{ background: "white", border: "1px solid #eee", borderRadius: 8, padding: "12px 16px", flex: 1, minWidth: 100 }}>
                                <div style={{ fontSize: 12, color: "#888" }}>{s.label}</div>
                                <div style={{ fontSize: 24, fontWeight: 600, color: s.color }}>{s.value}</div>
                            </div>
                        ))}
                    </div>
                    {data.stats.weakTopics?.length > 0 && (
                        <div style={{ marginTop: 12 }}>
                            <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Weak topics flagged:</p>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                {data.stats.weakTopics.map(t => (
                                    <span key={t} style={{ padding: "3px 10px", background: "#fff3cd", border: "1px solid #ffd66b", borderRadius: 99, fontSize: 12, color: "#7d5f00" }}>{t}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
export default PrepSummary