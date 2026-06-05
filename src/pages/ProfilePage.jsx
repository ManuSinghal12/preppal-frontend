import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile, updateProfile } from "../api/authAPI"
import { useAuth } from "../context/AuthContext"

const emptyForm = {
  name: "",
  branch: "",
  targetCompanies: "",
  goals: "",
  role: "SDE",
}

const ProfilePage = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    let mounted = true

    getProfile()
      .then((res) => {
        if (!mounted) return

        const data = res.data
        setProfile(data)
        setForm({
          name: data.name || "",
          branch: data.branch || "",
          targetCompanies: (data.targetCompanies || []).join(", "),
          goals: data.goals || "",
          role: data.role || "SDE",
        })
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.response?.data?.message || "Could not load profile")
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")
    setError("")

    try {
      const { data } = await updateProfile({
        ...form,
        targetCompanies: form.targetCompanies
          .split(",")
          .map((company) => company.trim())
          .filter(Boolean),
      })
      setProfile(data)
      setEditing(false)
      setMessage("Profile updated.")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setError(err.response?.data?.message || "Update failed")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="page max-w-2xl">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="page max-w-2xl">
      <div className="card p-8" aria-labelledby="profile-title">
        <header className="flex justify-between items-start mb-8">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase mb-2">PrepPal</p>
            <h1 id="profile-title" className="text-3xl font-bold text-slate-900 mb-1">Your Profile</h1>
            <p className="text-sm text-slate-500">
              {currentUser?.email || profile?.email || "Manage your preparation profile"}
            </p>
          </div>
          <button className="btn-secondary px-4 py-2 text-sm" type="button" onClick={handleLogout}>
            Log out
          </button>
        </header>

        {message && <p className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm mb-6">{message}</p>}
        {error && <p className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">{error}</p>}

        {!profile ? (
          <p className="text-slate-500">No profile data available.</p>
        ) : !editing ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Name</p>
                <p className="text-lg font-semibold text-slate-900">{profile.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Email</p>
                <p className="text-lg font-semibold text-slate-900">{profile.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Branch</p>
                <p className="text-lg font-semibold text-slate-900">{profile.branch || "Not added"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Role</p>
                <p className="text-lg font-semibold text-slate-900">{profile.role}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Target companies</p>
                <p className="text-lg font-semibold text-slate-900">
                  {(profile.targetCompanies || []).join(", ") || "Not added"}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Goals</p>
                <p className="text-lg font-semibold text-slate-900">{profile.goals || "Not added"}</p>
              </div>
            </div>

            <button
              className="btn-primary"
              type="button"
              onClick={() => setEditing(true)}
            >
              Edit profile
            </button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSave}>
            <div>
              <label className="label">Name</label>
              <input className="input" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div>
              <label className="label">Branch</label>
              <input
                className="input"
                name="branch"
                value={form.branch}
                onChange={handleChange}
                placeholder="Computer Science"
              />
            </div>

            <div>
              <label className="label">Target companies</label>
              <input
                className="input"
                name="targetCompanies"
                value={form.targetCompanies}
                onChange={handleChange}
                placeholder="Google, Microsoft, Amazon"
              />
            </div>

            <div>
              <label className="label">Goals</label>
              <textarea
                className="input"
                name="goals"
                value={form.goals}
                onChange={handleChange}
                placeholder="What are you working toward?"
                rows={4}
              />
            </div>

            <div>
              <label className="label">Role</label>
              <select className="input" name="role" value={form.role} onChange={handleChange}>
                <option value="SDE">SDE</option>
                <option value="ML">ML</option>
                <option value="Core">Core</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="btn-primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                className="btn-secondary"
                type="button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
