import { useState } from "react"
import { generateQuestions } from "../../api/aiAPI"
import { parseMarkdown } from "../../utils/parseMarkdown"

const TOPICS = ["Arrays", "Strings", "Linked List", "Trees", "Graphs", "DP", "Recursion", "OS", "DBMS", "CN", "OOPs", "System Design", "Other"]
const DIFFS = ["Beginner", "Intermediate", "Advanced"]
const TYPES = ["conceptual", "coding"]

const QuestionGenerator = () => {
    const [form, setForm] = useState({ topic: "Arrays", difficulty: "Intermediate", type: "conceptual" })
    const [questions, setQuestions] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleGenerate = async () => {
        setLoading(true); setError(""); setQuestions("")
        try {
            const { data } = await generateQuestions(form)
            setQuestions(data.questions)
        } catch (err) {
            setError(err.response?.data?.message || "Generation failed")
        } finally { setLoading(false) }
    }

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Generate interview questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {[["topic", TOPICS], ["difficulty", DIFFS], ["type", TYPES]].map(([name, opts]) => (
                    <div key={name}>
                        <label className="label capitalize">{name}</label>
                        <select name={name} value={form[name]} onChange={handleChange}
                            className="input">
                            {opts.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                ))}
            </div>
            <button onClick={handleGenerate} disabled={loading}
                className="btn-primary mb-4">
                {loading ? "Generating..." : "Generate 5 questions"}
            </button>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            {questions && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-xs text-slate-600 font-semibold uppercase mb-3">
                        {form.difficulty} {form.type} — {form.topic}
                    </p>
                    <div className="text-sm leading-relaxed text-slate-900">{parseMarkdown(questions)}</div>
                </div>
            )}
        </div>
    )
}
export default QuestionGenerator
