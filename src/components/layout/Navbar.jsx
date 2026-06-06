import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { LayoutDashboard, BookOpen, FileText, Sparkles, Bookmark, User, LogOut } from "lucide-react"

const LINKS = [
    { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { to: "/tracker", label: "Tracker", Icon: BookOpen },
    { to: "/notes", label: "Notes", Icon: FileText },
    { to: "/ai", label: "AI", Icon: Sparkles },
    { to: "/saved", label: "Saved", Icon: Bookmark }
]

const Navbar = () => {
    const { currentUser, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    if (!currentUser) return null
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <span className="font-bold text-brand-600 text-lg mr-4 tracking-tight">PrepPal</span>
                    {LINKS.map(({ to, label, Icon }) => {
                        const active = location.pathname === to
                        return (
                            <Link key={to} to={to} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors font-medium
                ${active ? "bg-brand-50 text-brand-700" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}>
                                <Icon size={15} />
                                {label}
                            </Link>
                        )
                    })}
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                        <User size={15} />
                        <span className="font-medium">{currentUser.name?.split(" ")[0]}</span>
                    </Link>
                    <button onClick={() => { logout(); navigate("/") }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={15} />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar