"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function PostJobForm() {
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [yearsMin, setYearsMin] = useState(0)
  const [yearsMax, setYearsMax] = useState(0)
  const [description, setDescription] = useState("")

  const steps = [
    <div className="space-y-2" key="title">
      <label>Job Title</label>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
    </div>,
    <div className="space-y-2" key="location">
      <label>Location</label>
      <Input value={location} onChange={(e) => setLocation(e.target.value)} />
    </div>,
    <div className="space-y-2" key="years">
      <label>Years of Experience</label>
      <div className="flex gap-2">
        <Input type="number" value={yearsMin} onChange={(e) => setYearsMin(Number(e.target.value))} placeholder="Min" />
        <Input type="number" value={yearsMax} onChange={(e) => setYearsMax(Number(e.target.value))} placeholder="Max" />
      </div>
    </div>,
    <div className="space-y-2" key="desc">
      <label>Job Description</label>
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button onClick={handleAI}>Fill with AI</Button>
    </div>
  ]

  async function handleAI() {
    const res = await fetch('/api/fill-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Write a job description for a ${title} in ${location} with ${yearsMin}-${yearsMax} years experience.` }),
    })
    const data = await res.json()
    setDescription(data.result)
  }


  function handleNext() {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      // Create a JSON object with all data
      const formData = {
        title,
        location,
        yearsMin,
        yearsMax,
        description,
      }

      // Convert to JSON blob
      const json = JSON.stringify(formData, null, 2)
      const blob = new Blob([json], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      // Create a temporary link element
      const link = document.createElement("a")
      link.href = url
      link.download = "job_post.json"
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <div>{steps[step]}</div>
      <Button onClick={handleNext} className="mt-4">{step < steps.length - 1 ? "Next" : "Submit"}</Button>
    </div>
  )
}