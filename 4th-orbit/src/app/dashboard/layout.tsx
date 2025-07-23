import Header from "@/components/Header"
import Link from "next/link"
import "../globals.css"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header variant="dark" />
      <nav className="flex gap-4 bg-teal-500 text-white p-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/post-job">Post Jobs</Link>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  )
}