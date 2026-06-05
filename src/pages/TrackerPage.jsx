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
        <div className="page">
            <h2 className="text-2xl font-bold mb-6">DSA Tracker</h2>
            <AddProblemForm onSuccess={refetch} />
            <FilterBar filters={filters} onChange={setFilters} />
            {error && <p className="text-red-600 mb-4">{error}</p>}
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