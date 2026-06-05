import { useState, useEffect } from "react"
import { getReviseToday, markRevised } from "../../api/problemApi"
import { useToast } from "../../context/ToastContext"

const RevisionQueue = () => {
    const { addToast } = useToast()
    const [problems, setProblems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getReviseToday()
            .then(res => setProblems(res.data))
            .finally(() => setLoading(false))
    }, [])

    const handleRevised = async (id) => {
        try {
            await markRevised(id)
            setProblems(prev => prev.filter(p => p._id !== id))
            addToast("Marked as revised!")
        } catch { addToast("Failed to mark revised", "error") }
    }

    if (loading) return <div>Loading revision queue...</div>

    if (!problems.length) return (
        <div style={{ padding: "12px 16px", background: "#f0fff4", borderRadius: 8, color: "#276749", fontSize: 14 }}>
            You are all caught up for today!
        </div>
    )

    return (
        <div>
            <h3 style={{ marginBottom: 12, fontSize: 16 }}>Revise today ({problems.length})</h3>
            {problems.map(p => (
                <div key={p._id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", border: "1px solid #eee", borderRadius: 6, marginBottom: 8 }}>
                    <div>
                        <span style={{ fontWeight: 500 }}>{p.title}</span>
                        <span style={{ marginLeft: 10, color: "#888", fontSize: 12 }}>{p.topic} · {p.difficulty}</span>
                    </div>
                    <button onClick={() => handleRevised(p._id)}
                        style={{ padding: "4px 14px", cursor: "pointer", background: "#f0fff4", border: "1px solid #c6e6d0", borderRadius: 6, color: "#276749", fontSize: 13 }}>
                        Mark revised
                    </button>
                </div>
            ))}
        </div>
    )
}
export default RevisionQueue