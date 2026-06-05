import { useState } from "react"
import { explainConcept } from "../../api/aiApi"
import { parseMarkdown } from "../../utils/parseMarkdown"

const DoubtSolver = () => {
    const [concept, setConcept] = useState("")
    const [beginnerMode, setBeginner] = useState(true)
    const [explanation, setExp] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleExplain = async () => {
        if (!concept.trim()) return
        setLoading(true); setError(""); setExp("")
        try {
            const { data } = await explainConcept({ concept, beginnerMode })
            setExp(data.explanation)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to get explanation")
        } finally { setLoading(false) }
    }

    return (
        <div>
            <h3 style={{ marginBottom: 16, fontSize: 17 }}>Doubt solver</h3>
            <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 4 }}>
                    Paste a concept, error, or code snippet
                </label>
                <textarea value={concept} onChange={e => setConcept(e.target.value)}
                    placeholder="e.g. What is a hash collision? How does HashMap resize itself?"
                    rows={4} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd", resize: "vertical", fontSize: 14 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14, color: "#555" }}>
                    <input type="checkbox" checked={beginnerMode} onChange={e => setBeginner(e.target.checked)} />
                    Explain like I am a beginner
                </label>
            </div>
            <button onClick={handleExplain} disabled={loading || !concept.trim()}
                style={{ padding: "8px 20px", cursor: "pointer", fontWeight: 500, borderRadius: 6, border: "1px solid #ccc", marginBottom: 16 }}>
                {loading ? "Explaining..." : "Explain"}
            </button>
            {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
            {explanation && (
                <div style={{ background: "#f8f4ff", border: "1px solid #e0d4ff", borderRadius: 8, padding: 16 }}>
                    <p style={{ margin: "0 0 6px", fontSize: 11, color: "#6b46c1", fontWeight: 600, textTransform: "uppercase" }}>Explanation</p>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>{parseMarkdown(explanation)}</p>
                </div>
            )}
        </div>
    )
}
export default DoubtSolver