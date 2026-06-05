// pages/AIPage.jsx — replace entirely
import { useState } from "react"
import NoteQA from "../components/ai/NoteQA"
import QuestionGenerator from "../components/ai/QuestionGenerator"
import DoubtSolver from "../components/ai/DoubtSolver"
import PrepSummary from "../components/ai/PrepSummary"
import MockInterview from "../components/ai/MockInterview"

const TABS = [
    { label: "Ask my notes", Component: NoteQA },
    { label: "Question generator", Component: QuestionGenerator },
    { label: "Doubt solver", Component: DoubtSolver },
    { label: "Prep summary", Component: PrepSummary },
    { label: "Mock interview", Component: MockInterview }
]

const AIPage = () => {
    const [active, setActive] = useState(0)
    const { Component } = TABS[active]
    return (
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 16px" }}>
            <h2 style={{ marginBottom: 20 }}>AI Features</h2>
            <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "2px solid #eee", overflowX: "auto" }}>
                {TABS.map(({ label }, i) => (
                    <button key={label} onClick={() => setActive(i)} style={{
                        padding: "8px 16px", cursor: "pointer", background: "none", border: "none",
                        borderBottom: active === i ? "2px solid #6366f1" : "2px solid transparent",
                        fontWeight: active === i ? 600 : 400, color: active === i ? "#6366f1" : "#666",
                        marginBottom: -2, fontSize: 13, whiteSpace: "nowrap"
                    }}>{label}</button>
                ))}
            </div>
            <Component />
        </div>
    )
}
export default AIPage