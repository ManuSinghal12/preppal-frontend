import { useState } from "react"
import { useProblems } from "../hooks/useProblems"
import FilterBar from "../components/tracker/FilterBar"
import AddProblemForm from "../components/tracker/AddProblemForm"
import ProblemList from "../components/tracker/ProblemList"
import EditProblemModal from "../components/tracker/EditProblemModal"

const TrackerPage = () => {
    const [filters, setFilters] = useState({})
    const [selectedProblem, setSelectedProblem] = useState(null)
    const { problems, loading, error, refetch } = useProblems(filters)

    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
            <h2 style={{ marginBottom: 20 }}>DSA Tracker</h2>
            <AddProblemForm onSuccess={refetch} />
            <FilterBar filters={filters} onChange={setFilters} />
            {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}
            <ProblemList
                problems={problems}
                loading={loading}
                onEdit={setSelectedProblem}
                onDelete={() => refetch()}
                onToggleStar={() => refetch()}
            />
            {selectedProblem && (
                <EditProblemModal
                    problem={selectedProblem}
                    onClose={() => setSelectedProblem(null)}
                    onSave={() => { refetch(); setSelectedProblem(null) }}
                />
            )}
        </div>
    )
}
export default TrackerPage