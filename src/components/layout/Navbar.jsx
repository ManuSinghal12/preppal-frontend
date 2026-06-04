import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/useAuth"

const LINKS = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/tracker", label: "Tracker" },
    { to: "/notes", label: "Notes" },
    { to: "/ai", label: "AI" },
    { to: "/profile", label: "Profile" }
]

const Navbar = () => {
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    if (!currentUser) return null
    const handleLogout = () => { logout(); navigate("/login") }
    return (
        <nav style={{ background: "var(--color-background-secondary)", borderBottom: "1px solid #eee", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52, position: "sticky", top: 0, zIndex: 100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                <span style={{ fontWeight: 700, fontSize: 15, marginRight: 18, color: "#6366f1" }}>PrepPal</span>
                {LINKS.map(({ to, label }) => (
                    <Link key={to} to={to} style={{
                        padding: "5px 12px", color: location.pathname === to ? "#6366f1" : "#555",
                        textDecoration: "none", fontSize: 14, borderRadius: 6,
                        fontWeight: location.pathname === to ? 600 : 400,
                        background: location.pathname === to ? "#eeecfd" : "none"
                    }}>{label}</Link>
                ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, color: "#666" }}>Hi, {currentUser.name?.split(" ")[0]}</span>
                <button onClick={handleLogout} style={{ padding: "4px 12px", cursor: "pointer", borderRadius: 6, border: "1px solid #ddd", fontSize: 13, background: "none" }}>Logout</button>
            </div>
        </nav>
    )
}
export default Navbar
