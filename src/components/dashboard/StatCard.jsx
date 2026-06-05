const StatCard = ({ label, value, color }) => (
    <div className="card flex-1 p-5 min-w-[120px]">
        <div className="text-xs text-slate-500 mb-2">{label}</div>
        <div className="text-3xl font-bold" style={{ color: color || "inherit" }}>{value}</div>
    </div>
)
export default StatCard
