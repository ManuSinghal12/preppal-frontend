import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile, updateProfile } from "../api/authAPI"
import { useAuth } from "../context/useAuth"

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
      <main className="page-shell">
        <section className="profile-panel">
          <p className="muted">Loading profile...</p>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="profile-panel" aria-labelledby="profile-title">
        <header className="profile-header">
          <div>
            <p className="eyebrow">PrepPal</p>
            <h1 id="profile-title">Your Profile</h1>
            <p className="muted">
              {currentUser?.email || profile?.email || "Manage your preparation profile"}
            </p>
          </div>
          <button className="secondary-button" type="button" onClick={handleLogout}>
            Log out
          </button>
        </header>

        {message && <p className="alert alert-success">{message}</p>}
        {error && <p className="alert alert-error">{error}</p>}

        {!profile ? (
          <p className="muted">No profile data available.</p>
        ) : !editing ? (
          <div className="profile-content">
            <div className="profile-grid">
              <div>
                <span>Name</span>
                <strong>{profile.name}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{profile.email}</strong>
              </div>
              <div>
                <span>Branch</span>
                <strong>{profile.branch || "Not added"}</strong>
              </div>
              <div>
                <span>Role</span>
                <strong>{profile.role}</strong>
              </div>
              <div>
                <span>Target companies</span>
                <strong>
                  {(profile.targetCompanies || []).join(", ") || "Not added"}
                </strong>
              </div>
              <div>
                <span>Goals</span>
                <strong>{profile.goals || "Not added"}</strong>
              </div>
            </div>

            <button
              className="primary-button fit-button"
              type="button"
              onClick={() => setEditing(true)}
            >
              Edit profile
            </button>
          </div>
        ) : (
          <form className="form-stack" onSubmit={handleSave}>
            <label className="field">
              <span>Name</span>
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>

            <label className="field">
              <span>Branch</span>
              <input
                name="branch"
                value={form.branch}
                onChange={handleChange}
                placeholder="Computer Science"
              />
            </label>

            <label className="field">
              <span>Target companies</span>
              <input
                name="targetCompanies"
                value={form.targetCompanies}
                onChange={handleChange}
                placeholder="Google, Microsoft, Amazon"
              />
            </label>

            <label className="field">
              <span>Goals</span>
              <textarea
                name="goals"
                value={form.goals}
                onChange={handleChange}
                placeholder="What are you working toward?"
                rows={4}
              />
            </label>

            <label className="field">
              <span>Role</span>
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="SDE">SDE</option>
                <option value="ML">ML</option>
                <option value="Core">Core</option>
              </select>
            </label>

            <div className="button-row">
              <button className="primary-button" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}

export default ProfilePage
