import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login as loginApi } from "../api/authAPI"
import { useAuth } from "../context/useAuth"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { data } = await loginApi({ email, password })
      login(data.token, {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      })
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="auth-heading">
          <p className="eyebrow">Welcome back</p>
          <h1 id="login-title">Log in to PrepPal</h1>
        </div>

        {error && <p className="alert alert-error">{error}</p>}

        <form className="form-stack" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="switch-link">
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
