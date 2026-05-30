// components/tracker/FilterBar.jsx
const TOPICS = ["", "Arrays", "Strings", "Linked List", "Stack-Queue", "Trees", "Graphs", "DP", "Recursion", "Sorting", "Binary Search", "Greedy", "Heap", "Other"]
const DIFFS = ["", "Easy", "Medium", "Hard"]
const STATS = ["", "Solved", "Stuck", "Revise", "To Do"]
const PLATS = ["", "LeetCode", "GFG", "HackerRank", "CodeForces", "Other"]

const FilterBar = ({ filters, onChange }) => {
    const set = (key, val) => onChange({ ...filters, [key]: val })
    return (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <input
                placeholder="Search title..."
                value={filters.search || ""}
                onChange={e => set("search", e.target.value)}
                style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ddd", minWidth: 180 }}
            />
            {[["topics", TOPICS], ["difficulties", DIFFS], ["statuses", STATS], ["platforms", PLATS]].map(([key, opts]) => (
                <select key={key} value={filters[key] || ""} onChange={e => set(key, e.target.value)}
                    style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ddd" }}>
                    {opts.map(o => <option key={o} value={o}>{o || `All ${key}`}</option>)}
                </select>
            ))}
            <button onClick={() => onChange({})} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #ddd", cursor: "pointer" }}>Clear</button>
        </div>
    )
}
export default FilterBar