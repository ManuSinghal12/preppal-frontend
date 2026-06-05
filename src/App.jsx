// Final App.jsx — replace entirely
import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import Navbar from "./components/layout/Navbar"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import TrackerPage from "./pages/TrackerPage"
import NotesPage from "./pages/NotesPage"
import AIPage from "./pages/AIPage"
import ProfilePage from "./pages/ProfilePage"
import SavedAnswerPage from "./pages/SavedAnswerPage"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/saved" element={<SavedAnswerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  )
}
export default App