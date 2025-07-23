"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

export default function Header({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <header className={clsx(
      "flex justify-between items-center p-4",
      variant === "dark" ? "bg-teal-500 text-white" : "bg-teal-200 text-white"
    )}>
      <div className="font-bold text-xl">4th Orbit</div>
      <Link href="/signup">
        <Button variant="secondary">Sign Up</Button>
      </Link>
    </header>
  )
}