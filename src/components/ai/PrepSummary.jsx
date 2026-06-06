import { useState, useEffect } from "react"
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

    // Auto-fetch summary when the component mounts
    useEffect(() => {
        handleFetch()
    }, [])

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Your prep summary</h3>
            <p className="text-slate-600 text-sm mb-4">
                AI analyses your actual tracker data and gives you a personalised coaching message.
            </p>
            <button onClick={handleFetch} disabled={loading}
                className="btn-primary mb-4">
                {loading ? "Analysing your data..." : "Get my prep summary"}
            </button>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            {data && (
                <div>
                    <div className="bg-white border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">
                        <p className="text-xs text-blue-700 font-semibold uppercase mb-2">AI Coaching</p>
                        <p className="text-sm leading-relaxed">{parseMarkdown(data.summary)}</p>
                    </div>
                    <div className="flex gap-3 flex-wrap mb-4">
                        {[
                            { label: "Total problems", value: data.stats.total, color: "#333" },
                            { label: "Solved", value: data.stats.solved, color: "#22c55e" },
                            { label: "Backlog", value: data.stats.backlog, color: "#f59e0b" },
                            { label: "Weak topics", value: data.stats.weakTopics?.length || 0, color: "#ef4444" }
                        ].map(s => (
                            <div key={s.label} className="card flex-1 p-3 min-w-[100px]">
                                <div className="text-xs text-slate-600 mb-1">{s.label}</div>
                                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                            </div>
                        ))}
                    </div>
                    {data.stats.weakTopics?.length > 0 && (
                        <div>
                            <p className="text-sm text-slate-600 mb-2">Weak topics flagged:</p>
                            <div className="flex gap-2 flex-wrap">
                                {data.stats.weakTopics.map(t => (
                                    <span key={t} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">{t}</span>
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