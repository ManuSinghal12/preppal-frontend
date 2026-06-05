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
            <h3 style={{ marginBottom: 16, fontSize: 17 }}>Mock interview</h3>
            {!started ? (
                <div>
                    <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 4 }}>Select topic</label>
                    <select value={topic} onChange={e => setTopic(e.target.value)}
                        style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", marginBottom: 14, minWidth: 200 }}>
                        {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <br />
                    <button onClick={start} disabled={loading}
                        style={{ padding: "8px 20px", cursor: "pointer", fontWeight: 500, borderRadius: 6, border: "1px solid #ccc" }}>
                        {loading ? "Starting..." : "Start 5-question round"}
                    </button>
                </div>
            ) : done ? (
                <div>
                    <div style={{ background: "#f0fff4", border: "1px solid #b2f5ea", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                        <p style={{ margin: "0 0 6px", fontSize: 11, color: "#276749", fontWeight: 600, textTransform: "uppercase" }}>Round complete</p>
                        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>{parseMarkdown(feedback)}</p>
                    </div>
                    <button onClick={restart} style={{ padding: "8px 18px", cursor: "pointer", borderRadius: 6, border: "1px solid #ddd" }}>Start new round</button>
                </div>
            ) : (
                <div>
                    <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 14 }}>
                        <p style={{ margin: "0 0 6px", fontSize: 11, color: "#888", fontWeight: 600 }}>
                            QUESTION {qIndex + 1} OF 5 — {topic.toUpperCase()}
                        </p>
                        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65 }}>{parseMarkdown(question)}</p>
                    </div>
                    <textarea value={answer} onChange={e => setAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        rows={4} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd", resize: "vertical", marginBottom: 10, fontSize: 14 }} />
                    <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={submit} disabled={loading || !answer.trim()}
                            style={{ padding: "8px 20px", cursor: "pointer", fontWeight: 500, borderRadius: 6, border: "1px solid #ccc" }}>
                            {loading ? "Submitting..." : qIndex >= 4 ? "Submit final answer" : "Submit answer"}
                        </button>
                        <button onClick={restart} style={{ padding: "8px 14px", cursor: "pointer", borderRadius: 6, border: "1px solid #eee", color: "#888" }}>Restart</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default MockInterview