// pages/SignupPage.jsx — redesigned with Tailwind
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signup as signupApi } from "../api/authApi"
import { useAuth } from "../context/AuthContext"

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "SDE", branch: "",
    targetCompanies: "",
    goals: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true)
    try {
      const { data } = await signupApi(form)
      login(data.token, { _id: data._id, name: data.name, email: data.email, role: data.role })
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-600 rounded-2xl mb-4">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Start your prep journey</h1>
          <p className="text-slate-500 text-sm mt-1">Create your free PrepPal account</p>
        </div>
        <div className="card p-8">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Full name</label>
              <input name="name" value={form.name} onChange={handleChange}
                className="input" placeholder="Your Name" required />
            </div>
            <div>
              <label className="label">Email address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                className="input" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange}
                className="input" placeholder="Minimum 6 characters" required />
            </div>
            <div>
              <label className="label">I am preparing for</label>
              <select name="role" value={form.role} onChange={handleChange} className="input">
                <option value="SDE">Software Development (SDE)</option>
                <option value="ML">Machine Learning / AI</option>
                <option value="Core">Core Engineering</option>
              </select>
            </div>
            <div>
              <label className="label">Branch</label>
              <input
                name="branch"
                value={form.branch}
                onChange={handleChange}
                className="input"
                placeholder="CSE, ECE, Mechanical..."
                required
              />
            </div>
            <div>
              <label className="label">Target Companies</label>
              <input
                name="targetCompanies"
                value={form.targetCompanies}
                onChange={handleChange}
                className="input"
                placeholder="Google, Amazon, Microsoft..."
                required
              />
            </div>
            <div>
              <label className="label">Goals</label>
              <textarea
                name="goals"
                value={form.goals}
                onChange={handleChange}
                className="input min-h-24"
                placeholder="Crack a product-based company, improve DSA..."
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center">
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-600 font-medium hover:text-brand-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default SignupPage