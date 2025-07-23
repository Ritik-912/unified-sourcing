"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "root" && password === "1") {
      router.push("/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-80">
      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" className="w-full">Login</Button>
    </form>
  )
}