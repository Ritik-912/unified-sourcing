import Header from "@/components/Header"
import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <div>
      <Header variant="light" />
      <main className="flex justify-between items-center p-10">
        <div className="text-4xl font-bold text-teal-700">A Premium Management Tool</div>
        <LoginForm />
      </main>
    </div>
  )
}