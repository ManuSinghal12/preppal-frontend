import { deleteNote } from "../../api/noteApi"

const NoteCard = ({ note, onDelete }) => {
    const chunkCount = Number.isInteger(note.chunkCount) ? note.chunkCount : note.chunks?.length

    const handleDelete = async () => {
        if (!window.confirm("Delete this note and all its content?")) return
        try { await deleteNote(note._id); onDelete(note._id) }
        catch { alert("Failed to delete note") }
    }
    return (
        <div style={{ background: "var(--color-background-secondary)", border: "1px solid #eee", borderRadius: 10, padding: 16, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                    <h3 style={{ margin: "0 0 3px", fontSize: 16 }}>{note.title}</h3>
                    <p style={{ margin: "0 0 8px", color: "#666", fontSize: 13 }}>{note.subject}</p>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        {note.tags?.map(tag => (
                            <span key={tag} style={{ padding: "2px 8px", background: "#e8f4fd", borderRadius: 99, fontSize: 12, color: "#0066cc" }}>{tag}</span>
                        ))}
                    </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                    <p style={{ margin: "0 0 3px", fontSize: 12, color: "#888" }}>{note.originalFileName}</p>
                    <p style={{ margin: "0 0 3px", fontSize: 12, color: "#888" }}>
                        {chunkCount === undefined ? "Chunk count unavailable" : `${chunkCount} chunks`}
                    </p>
                    <p style={{ margin: "0 0 8px", fontSize: 12, color: "#888" }}>{new Date(note.createdAt).toLocaleDateString()}</p>
                    <button onClick={handleDelete}
                        style={{ padding: "3px 10px", cursor: "pointer", borderRadius: 4, border: "1px solid #fcc", color: "#c33", fontSize: 12 }}>Delete</button>
                </div>
            </div>
        </div>
    )
}
export default NoteCard
