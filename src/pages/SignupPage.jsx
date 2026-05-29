import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signup as signupApi } from "../api/authAPI"
import { useAuth } from "../context/useAuth"

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "SDE",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { data } = await signupApi(form)
      login(data.token, {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      })
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel" aria-labelledby="signup-title">
        <div className="auth-heading">
          <p className="eyebrow">Start preparing</p>
          <h1 id="signup-title">Create your PrepPal account</h1>
        </div>

        {error && <p className="alert alert-error">{error}</p>}

        <form className="form-stack" onSubmit={handleSubmit}>
          <label className="field">
            <span>Name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </label>

          <label className="field">
            <span>I am preparing for</span>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="SDE">SDE</option>
              <option value="ML">ML</option>
              <option value="Core">Core</option>
            </select>
          </label>

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="switch-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  )
}

export default SignupPage
