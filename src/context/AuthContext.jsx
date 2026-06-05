import { createContext, useMemo, useState, useContext } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const login = (tokenValue, userObj) => {
    localStorage.setItem("token", tokenValue)
    localStorage.setItem("user", JSON.stringify(userObj))
    setToken(tokenValue)
    setCurrentUser(userObj)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setCurrentUser(null)
  }

  const value = useMemo(
    () => ({ token, currentUser, login, logout }),
    [token, currentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

export default AuthContext
