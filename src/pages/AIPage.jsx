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
        <div className="page max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">AI Features</h2>
            <div className="flex gap-0 mb-6 border-b border-slate-200 overflow-x-auto">
                {TABS.map(({ label }, i) => (
                    <button key={label} onClick={() => setActive(i)}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${active === i
                                ? 'border-brand-600 text-brand-600'
                                : 'border-transparent text-slate-600 hover:text-slate-900'
                            }`}>
                        {label}
                    </button>
                ))}
            </div>
            <Component />
        </div>
    )
}
export default AIPage