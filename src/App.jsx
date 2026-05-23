import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050"

function App() {
  const [msg, setMsg] = useState("loading...")

  useEffect(() => {
    axios
      .get(`${API_URL}/api/test`)
      .then((res) => setMsg(res.data.message))
      .catch(() => setMsg("could not reach server"))
  }, [])

  return <h1>{msg}</h1>
}

export default App
