import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bf-atmosphere px-5 py-12">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="font-display text-2xl font-semibold text-bf-ink">
          BOOKFLO
        </Link>
        <div className="mt-10 rounded-3xl border border-bf-line bg-white/80 p-8 shadow-soft backdrop-blur">
          <h1 className="font-display text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-bf-muted">
            Demo login — no real auth. Continues to the Contour Preston dashboard.
          </p>
          <form className="mt-8 space-y-4" action="/dashboard">
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium text-bf-ink">Email</span>
              <input
                type="email"
                defaultValue="amelia@contourpreston.example"
                className="w-full rounded-xl border border-bf-line bg-white px-3.5 py-2.5 outline-none focus:border-bf-accent"
              />
            </label>
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium text-bf-ink">Password</span>
              <input
                type="password"
                defaultValue="demo-password"
                className="w-full rounded-xl border border-bf-line bg-white px-3.5 py-2.5 outline-none focus:border-bf-accent"
              />
            </label>
            <Button type="submit" variant="dark" className="w-full py-3">
              Log in
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-bf-muted">
            New here?{" "}
            <Link href="/signup" className="font-medium text-bf-accent hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
