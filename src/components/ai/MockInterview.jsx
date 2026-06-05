import { useState } from "react"
import { mockInterview as mockApi } from "../../api/aiApi"
import { parseMarkdown } from "../../utils/parseMarkdown"

const TOPICS = ["Arrays", "Strings", "Linked List", "Trees", "Graphs", "DP", "Recursion", "OS", "DBMS", "CN", "OOPs"]

const MockInterview = () => {
    const [topic, setTopic] = useState("Arrays")
    const [started, setStarted] = useState(false)
    const [question, setQ] = useState("")
    const [answer, setAnswer] = useState("")
    const [feedback, setFeedback] = useState("")
    const [qIndex, setQIndex] = useState(0)
    const [done, setDone] = useState(false)
    const [loading, setLoading] = useState(false)

    const start = async () => {
        setLoading(true)
        try {
            const { data } = await mockApi({ topic, questionIndex: 0 })
            setQ(data.question); setStarted(true); setQIndex(0); setFeedback(""); setDone(false)
        } finally { setLoading(false) }
    }

    const submit = async () => {
        if (!answer.trim()) return
        setLoading(true)
        try {
            const { data } = await mockApi({ topic, userAnswer: answer, questionIndex: qIndex })
            if (data.done) {
                setFeedback(data.feedback); setDone(true); setQ("")
            } else {
                setFeedback("")
                // feedbackAndQuestion has both in one string — split on "Question" keyword
                setQ(data.feedbackAndQuestion); setQIndex(data.questionIndex)
            }
            setAnswer("")
        } finally { setLoading(false) }
    }

    const restart = () => { setStarted(false); setQ(""); setAnswer(""); setFeedback(""); setQIndex(0); setDone(false) }

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Mock interview</h3>
            {!started ? (
                <div>
                    <label className="label">Select topic</label>
                    <select value={topic} onChange={e => setTopic(e.target.value)}
                        className="input mb-4 min-w-[200px]">
                        {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <button onClick={start} disabled={loading}
                        className="btn-primary">
                        {loading ? "Starting..." : "Start 5-question round"}
                    </button>
                </div>
            ) : done ? (
                <div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <p className="text-xs text-green-700 font-semibold uppercase mb-2">Round complete</p>
                        <p className="text-sm leading-relaxed">{parseMarkdown(feedback)}</p>
                    </div>
                    <button onClick={restart} className="btn-secondary">Start new round</button>
                </div>
            ) : (
                <div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                        <p className="text-xs text-slate-600 font-semibold mb-2">
                            QUESTION {qIndex + 1} OF 5 — {topic.toUpperCase()}
                        </p>
                        <p className="text-sm leading-relaxed">{parseMarkdown(question)}</p>
                    </div>
                    <textarea value={answer} onChange={e => setAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        rows={4} className="input mb-4" />
                    <div className="flex gap-2">
                        <button onClick={submit} disabled={loading || !answer.trim()}
                            className="btn-primary">
                            {loading ? "Submitting..." : qIndex >= 4 ? "Submit final answer" : "Submit answer"}
                        </button>
                        <button onClick={restart} className="btn-secondary">Restart</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default MockInterview