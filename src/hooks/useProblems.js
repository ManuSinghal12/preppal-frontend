import { useState, useEffect, useCallback } from "react"
import { getAllProblems } from "../api/problemApi"

const EMPTY_FILTERS = {}

export const useProblems = (filters = EMPTY_FILTERS) => {
    const [problems, setProblems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchProblems = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const { data } = await getAllProblems(filters)
            setProblems(data)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch problems")
        } finally {
            setLoading(false)
        }
    }, [filters])

    // Fetching remote data on filter changes is the intended synchronization here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { fetchProblems() }, [fetchProblems])

    return { problems, loading, error, refetch: fetchProblems }
}
