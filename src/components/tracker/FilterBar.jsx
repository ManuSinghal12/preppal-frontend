// components/tracker/FilterBar.jsx
const TOPICS = ["", "Arrays", "Strings", "Linked List", "Stack-Queue", "Trees", "Graphs", "DP", "Recursion", "Sorting", "Binary Search", "Greedy", "Heap", "Other"]
const DIFFS = ["", "Easy", "Medium", "Hard"]
const STATS = ["", "Solved", "Stuck", "Revise", "To Do"]
const PLATS = ["", "LeetCode", "GFG", "HackerRank", "CodeForces", "Other"]

const FilterBar = ({ filters, onChange }) => {
    const set = (key, val) => onChange({ ...filters, [key]: val })
    return (
        <div className="flex gap-2 flex-wrap mb-6">
            <input
                placeholder="Search title..."
                value={filters.search || ""}
                onChange={e => set("search", e.target.value)}
                className="input min-w-[180px]"
            />
            {[["topics", TOPICS], ["difficulties", DIFFS], ["statuses", STATS], ["platforms", PLATS]].map(([key, opts]) => (
                <select key={key} value={filters[key] || ""} onChange={e => set(key, e.target.value)}
                    className="input px-3 py-2">
                    {opts.map(o => <option key={o} value={o}>{o || `All ${key}`}</option>)}
                </select>
            ))}
            <button onClick={() => onChange({})} className="btn-secondary px-3 py-2">Clear</button>
        </div>
    )
}
export default FilterBar