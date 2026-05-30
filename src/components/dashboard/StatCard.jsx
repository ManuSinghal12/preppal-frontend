const StatCard = ({ label, value, color }) => (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "18px 20px", flex: 1, minWidth: 120 }}>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 600, color: color || "var(--color-text-primary)" }}>{value}</div>
    </div>
)
export default StatCard
