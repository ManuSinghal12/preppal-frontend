import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"
import TrackerPage from "./pages/TrackerPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<ProfilePage />} />
        <Route path="/profile" element={<Navigate to="/dashboard" replace />} />
        <Route path="/tracker" element={<TrackerPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
