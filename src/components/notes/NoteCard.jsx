import { ExternalLink } from "lucide-react"
import { deleteNote } from "../../api/noteApi"
import { useToast } from "../../context/ToastContext"

const NoteCard = ({ note, onDelete }) => {
    const { addToast } = useToast()
    const chunkCount = Number.isInteger(note.chunkCount) ? note.chunkCount : note.chunks?.length

    const handleDelete = async () => {
        if (!window.confirm("Delete this note and all its content?")) return
        try { await deleteNote(note._id); onDelete(note._id); addToast("Note deleted") }
        catch { addToast("Failed to delete note", "error") }
    }

    const handleView = () => {
        if (!note.filePath) {
            addToast("File link unavailable. This note might have been uploaded before the view feature was enabled.", "error");
            return;
        }


        const fileName = note.filePath.split(/[/\\]/).pop();
        const fileUrl = `http://localhost:5050/uploads/${fileName}`;

        window.open(fileUrl, "_blank", "noopener,noreferrer")
    }

    return (
        <div className="card p-4 mb-3">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-base font-semibold mb-1">{note.title}</h3>
                    <p className="text-slate-600 text-sm mb-2">{note.subject}</p>
                    <div className="flex gap-1 flex-wrap">
                        {note.tags?.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-xs text-slate-500 mb-1">{note.originalFileName}</p>
                    <p className="text-xs text-slate-500 mb-1">
                        {chunkCount === undefined ? "Chunk count unavailable" : `${chunkCount} chunks`}
                    </p>
                    <p className="text-xs text-slate-500 mb-3">{new Date(note.createdAt).toLocaleDateString()}</p>
                    <div className="flex gap-2 justify-end">
                        <button onClick={handleView}
                            className="btn-secondary text-xs flex items-center gap-1">
                            <ExternalLink size={12} /> Open
                        </button>
                        <button onClick={handleDelete}
                            className="btn-danger text-xs">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NoteCard
