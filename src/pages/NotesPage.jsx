import { useState, useEffect } from "react"
import { getAllNotes } from "../api/noteApi"
import UploadNoteForm from "../components/notes/UploadNoteForm"
import NoteCard from "../components/notes/NoteCard"
import EmptyState from "../components/ui/EmptyState"

const NotesPage = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchNotes = async ({ showLoading = false } = {}) => {
        if (showLoading) setLoading(true)
        try {
            const res = await getAllNotes()
            setNotes(res.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllNotes().then(res => setNotes(res.data)).finally(() => setLoading(false))
    }, [])

    const handleDelete = (id) => setNotes(prev => prev.filter(n => n._id !== id))

    return (
        <div className="page max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Notes</h2>
            <UploadNoteForm onSuccess={fetchNotes} />
            {loading ? (
                <div className="text-center text-slate-400 py-8">Loading notes...</div>
            ) : notes.length === 0 ? (
                <EmptyState message="No notes yet. Upload a PDF or text file above." />
            ) : (
                notes.map(note => <NoteCard key={note._id} note={note} onDelete={handleDelete} />)
            )}
        </div>
    )
}
export default NotesPage
