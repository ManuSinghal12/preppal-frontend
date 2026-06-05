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
            <h3 className="text-lg font-semibold mb-4">Doubt solver</h3>
            <div className="mb-4">
                <label className="label">
                    Paste a concept, error, or code snippet
                </label>
                <textarea value={concept} onChange={e => setConcept(e.target.value)}
                    placeholder="e.g. What is a hash collision? How does HashMap resize itself?"
                    rows={4} className="input" />
            </div>
            <div className="flex items-center gap-2.5 mb-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                    <input type="checkbox" checked={beginnerMode} onChange={e => setBeginner(e.target.checked)} />
                    Explain like I am a beginner
                </label>
            </div>
            <button onClick={handleExplain} disabled={loading || !concept.trim()}
                className="btn-primary mb-4">
                {loading ? "Explaining..." : "Explain"}
            </button>
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            {explanation && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-xs text-purple-700 font-semibold uppercase mb-2">Explanation</p>
                    <p className="text-sm leading-relaxed">{parseMarkdown(explanation)}</p>
                </div>
            )}
        </div>
    )
}
export default DoubtSolver