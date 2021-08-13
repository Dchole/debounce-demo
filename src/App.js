import { useEffect, useState } from "react"
import LoginForm from "./components/LoginForm/LoginForm"

export const API = "https://jsonplaceholder.typicode.com/users"

export default function App() {
  const [availableUsers, setAvailableUsers] = useState([])

  useEffect(() => {
    ;(async () => {
      const users = await fetch(API).then(res => res.json())
      setAvailableUsers(_prevUsers => [...users.map(user => user.name)])
    })()
  }, [])

  return (
    <main>
      <h1>Sign in</h1>
      <h2>Available Users</h2>
      <ul>
        {availableUsers.map(user => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <LoginForm availableUsers={availableUsers} />
    </main>
  )
}
