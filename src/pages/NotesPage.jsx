import { useState, useEffect } from "react"
import { getAllNotes } from "../api/noteApi"
import UploadNoteForm from "../components/notes/UploadNoteForm"
import NoteCard from "../components/notes/NoteCard"
import EmptyState from "../components/ui/EmptyState"

const NotesPage = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchNotes = () => {
        setLoading(true)
        getAllNotes().then(res => setNotes(res.data)).finally(() => setLoading(false))
    }
    useEffect(() => { fetchNotes() }, [])

    const handleDelete = (id) => setNotes(prev => prev.filter(n => n._id !== id))

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
            <h2 style={{ marginBottom: 20 }}>Notes</h2>
            <UploadNoteForm onSuccess={fetchNotes} />
            {loading ? (
                <div style={{ textAlign: "center", color: "#888", padding: 20 }}>Loading notes...</div>
            ) : notes.length === 0 ? (
                <EmptyState message="No notes yet. Upload a PDF or text file above." />
            ) : (
                notes.map(note => <NoteCard key={note._id} note={note} onDelete={handleDelete} />)
            )}
        </div>
    )
}
export default NotesPage