import { useState, useRef } from "react";
import { FileText, Upload } from "lucide-react";
import { uploadNote } from "../../api/noteApi"
import { useToast } from "../../context/ToastContext"

const UploadNoteForm = ({ onSuccess }) => {
    const { addToast } = useToast()
    const [form, setForm] = useState({ title: "", subject: "", tags: "" })
    const [selectedFileName, setSelectedFileName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [status, setStatus] = useState("")
    const fileRef = useRef(null)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFileName(file.name);
        } else {
            setSelectedFileName("");
        }
    };

    const handleSubmit = async e => {
        e.preventDefault()
        const file = fileRef.current?.files[0]
        if (!file) { setError("Please select a PDF or .txt file"); return }
        setError(""); setLoading(true); setStatus("Uploading and processing file...")
        const fd = new FormData()
        fd.append("file", file)
        fd.append("title", form.title)
        fd.append("subject", form.subject)
        fd.append("tags", form.tags)
        try {
            await uploadNote(fd)
            setForm({ title: "", subject: "", tags: "" })
            setSelectedFileName("")
            if (fileRef.current) fileRef.current.value = ""
            setStatus(""); addToast("Note uploaded successfully!"); onSuccess()
        } catch (err) {
            const errMsg = err.response?.data?.message || "Upload failed"
            setError(errMsg)
            addToast(errMsg, "error")
            setStatus("")
        } finally { setLoading(false) }
    }

    return (
        <div className="card p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Upload notes</h3>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            {status && <p className="text-slate-600 text-sm mb-2">{status}</p>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Title *</label>
                        <input name="title" value={form.title} onChange={handleChange} required
                            className="input" />
                    </div>
                    <div>
                        <label className="label">Subject *</label>
                        <input name="subject" value={form.subject} onChange={handleChange} required
                            className="input" />
                    </div>
                    <div>
                        <label className="label">Tags (comma-separated)</label>
                        <input name="tags" value={form.tags} onChange={handleChange} placeholder="DBMS, OS, networks"
                            className="input" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label">File (.pdf or .txt) *</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-xl hover:border-brand-500 hover:bg-slate-50 transition-colors group cursor-pointer relative">
                            <div className="space-y-1 text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-50 text-brand-600 mb-2 group-hover:scale-110 transition-transform">
                                    {selectedFileName ? <FileText size={24} /> : <Upload size={24} />}
                                </div>
                                <div className="flex text-sm text-slate-600">
                                    <span className="relative rounded-md font-medium text-brand-600">
                                        {selectedFileName || "Click to upload or drag and drop"}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500">
                                    PDF or TXT up to 10MB
                                </p>
                            </div>
                            <input type="file" accept=".pdf,.txt" ref={fileRef} onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={loading}
                    className="btn-primary mt-4">
                    {loading ? "Processing..." : "Upload"}
                </button>
            </form>
        </div>
    )
}
export default UploadNoteForm