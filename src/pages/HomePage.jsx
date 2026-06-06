import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { BookOpen, BarChart3, Brain, FileText, MessageSquare, Repeat, Check } from "lucide-react"

const FEATURES = [
    {
        Icon: BookOpen, color: "bg-blue-50 text-blue-600",
        title: "DSA Problem Tracker",
        desc: "Log every problem you solve with topic, difficulty, platform and status. Filter and search instantly across your entire history."
    },
    {
        Icon: Repeat, color: "bg-green-50 text-green-600",
        title: "Spaced Revision System",
        desc: "Problems resurface at 1, 3, 7, 14, 30 days — exactly when you would forget them. Based on spaced repetition research."
    },
    {
        Icon: BarChart3, color: "bg-purple-50 text-purple-600",
        title: "Analytics Dashboard",
        desc: "Topic distribution charts, difficulty splits, weak topic detection, and revision backlog. See exactly where you stand."
    },
    {
        Icon: FileText, color: "bg-amber-50 text-amber-600",
        title: "AI Notes Q&A",
        desc: "Upload your PDF notes. Ask questions in plain English. Get answers grounded in your own material with sources shown."
    },
    {
        Icon: MessageSquare, color: "bg-red-50 text-red-600",
        title: "Interview Question Generator",
        desc: "Generate 5 placement-ready questions on any CS topic — beginner to advanced, conceptual or coding — in seconds."
    },
    {
        Icon: Brain, color: "bg-indigo-50 text-indigo-600",
        title: "Mock Interview + AI Coach",
        desc: "5-question mock rounds with per-answer feedback. Doubt solver. Personalised prep summary from your actual tracker data."
    }
]

const BULLETS = [
    "Spaced revision scheduling — never forget a solved problem",
    "RAG-powered Q&A on your own uploaded notes",
    "AI coaching grounded in your real tracker stats",
    "Interview question generator for any topic or difficulty"
]

const HomePage = () => {
    const { currentUser } = useAuth()
    if (currentUser) return <Navigate to="/dashboard" replace />

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

            {/* ── NAV ── */}
            <nav className="border-b border-slate-100 sticky top-0 z-50"
                style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}>
                <div style={{
                    maxWidth: 1152, margin: "0 auto", padding: "0 24px", height: 56,
                    display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                            width: 30, height: 30, borderRadius: 8, background: "#4f46e5",
                            display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>P</span>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 16, color: "#1e1b4b", letterSpacing: "-0.02em" }}>PrepPal</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Link to="/login" style={{
                            fontSize: 14, color: "#64748b", fontWeight: 500,
                            textDecoration: "none", padding: "6px 12px", borderRadius: 8,
                            transition: "color 0.15s"
                        }}
                            onMouseEnter={e => e.target.style.color = "#1e293b"}
                            onMouseLeave={e => e.target.style.color = "#64748b"}>Sign in</Link>
                        <Link to="/signup" style={{
                            fontSize: 14, fontWeight: 600, color: "white",
                            background: "#4f46e5", textDecoration: "none", padding: "7px 18px",
                            borderRadius: 10, transition: "background 0.15s", boxShadow: "0 1px 3px rgba(79,70,229,0.4)"
                        }}
                            onMouseEnter={e => e.target.style.background = "#4338ca"}
                            onMouseLeave={e => e.target.style.background = "#4f46e5"}>Get started free</Link>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <div style={{
                position: "relative", overflow: "hidden",
                background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
                color: "white"
            }}>
                {/* dot grid */}
                <div style={{
                    position: "absolute", inset: 0, opacity: 0.07,
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "28px 28px"
                }} />
                {/* glow blobs */}
                <div style={{
                    position: "absolute", top: "-80px", left: "50%", transform: "translateX(-30%)",
                    width: 400, height: 400, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)"
                }} />
                <div style={{
                    position: "absolute", bottom: "-40px", right: "10%",
                    width: 300, height: 300, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)"
                }} />

                <div style={{
                    position: "relative", maxWidth: 860, margin: "0 auto",
                    padding: "96px 24px 88px", textAlign: "center"
                }}>

                    <h1 style={{
                        fontSize: "clamp(38px, 6vw, 62px)", fontWeight: 800,
                        lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 22
                    }}>
                        Your unfair advantage
                        <br />
                        <span style={{
                            background: "linear-gradient(90deg, #818cf8 0%, #38bdf8 100%)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                        }}>
                            in placement season
                        </span>
                    </h1>

                    <p style={{
                        fontSize: 18, color: "#94a3b8", maxWidth: 560,
                        margin: "0 auto 36px", lineHeight: 1.7
                    }}>
                        Track DSA problems with spaced revision. Upload notes for AI Q&amp;A.
                        Get coaching from your actual prep data — not generic advice.
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                        <Link to="/signup" style={{
                            display: "inline-block", background: "#4f46e5",
                            color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none",
                            padding: "13px 30px", borderRadius: 12, transition: "all 0.15s",
                            boxShadow: "0 4px 20px rgba(79,70,229,0.45)"
                        }}
                            onMouseEnter={e => { e.target.style.background = "#4338ca"; e.target.style.transform = "translateY(-1px)" }}
                            onMouseLeave={e => { e.target.style.background = "#4f46e5"; e.target.style.transform = "translateY(0)" }}>
                            Start for free →
                        </Link>
                        <Link to="/login" style={{
                            display: "inline-block",
                            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)",
                            color: "white", fontWeight: 500, fontSize: 15, textDecoration: "none",
                            padding: "13px 28px", borderRadius: 12, transition: "background 0.15s"
                        }}
                            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.14)"}
                            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.08)"}>
                            Sign in
                        </Link>
                    </div>

                    {/* bullet proof points */}
                    <div style={{
                        display: "flex", flexWrap: "wrap", justifyContent: "center",
                        gap: "8px 24px", marginTop: 40
                    }}>
                        {BULLETS.map(b => (
                            <div key={b} style={{
                                display: "flex", alignItems: "center", gap: 6,
                                fontSize: 13, color: "#94a3b8"
                            }}>
                                <Check size={13} color="#4ade80" />
                                {b}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── FEATURES ── */}
            <div style={{ background: "#f8fafc" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <h2 style={{
                            fontSize: 32, fontWeight: 700, color: "#0f172a",
                            letterSpacing: "-0.02em", marginBottom: 12
                        }}>
                            Everything you need. Nothing you don't.
                        </h2>
                        <p style={{ fontSize: 16, color: "#64748b", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
                            One platform built around how placement preparation actually works.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
                        {FEATURES.map(({ Icon, title, desc, color }) => (
                            <div key={title} style={{
                                background: "white", borderRadius: 14,
                                border: "1px solid #e2e8f0", padding: "22px 24px",
                                transition: "box-shadow 0.2s, transform 0.2s", cursor: "default"
                            }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)" }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)" }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 10, marginBottom: 16,
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}
                                    className={color}>
                                    <Icon size={20} />
                                </div>
                                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>{title}</h3>
                                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, margin: 0 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── CTA BANNER ── */}
            <div style={{ background: "#0f172a", color: "white" }}>
                <div style={{ maxWidth: 700, margin: "0 auto", padding: "72px 24px", textAlign: "center" }}>
                    <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>
                        Placements are coming.
                    </h2>
                    <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
                        The students who get placed aren't smarter — they prepared smarter.
                        PrepPal is free. There's no reason to wait.
                    </p>
                    <Link to="/signup" style={{
                        display: "inline-block", background: "#4f46e5",
                        color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none",
                        padding: "14px 36px", borderRadius: 12,
                        boxShadow: "0 4px 20px rgba(79,70,229,0.4)", transition: "all 0.15s"
                    }}
                        onMouseEnter={e => { e.target.style.background = "#4338ca"; e.target.style.transform = "translateY(-1px)" }}
                        onMouseLeave={e => { e.target.style.background = "#4f46e5"; e.target.style.transform = "translateY(0)" }}>
                        Create your free account
                    </Link>
                    <p style={{ color: "#475569", fontSize: 13, marginTop: 16 }}>No credit card. No setup fee. Just your prep.</p>
                </div>
            </div>

            {/* ── FOOTER ── */}
            <footer style={{ borderTop: "1px solid #f1f5f9", background: "white" }}>
                <div style={{
                    maxWidth: 1100, margin: "0 auto", padding: "24px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    fontSize: 13, color: "#94a3b8", flexWrap: "wrap", gap: 8
                }}>
                    <span style={{ fontWeight: 700, color: "#334155" }}>PrepPal</span>
                    <span>Built with MERN · LangChain.js · Groq · Tailwind CSS</span>
                    <div style={{ display: "flex", gap: 16 }}>
                        <Link to="/login" style={{ color: "#94a3b8", textDecoration: "none" }}>Sign in</Link>
                        <Link to="/signup" style={{ color: "#4f46e5", fontWeight: 500, textDecoration: "none" }}>Get started</Link>
                    </div>
                </div>
            </footer>

        </div>
    )
}
export default HomePage