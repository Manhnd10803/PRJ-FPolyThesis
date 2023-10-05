import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { UserAuthForm } from "./components/user-auth-form"
import { buttonVariants } from "@/components/ui/button"

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative min-h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-10 lg:py-7 md:px-1">
        <Link
          to="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Register
        </Link>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login
              </h1>
            </div>
            <UserAuthForm />
          </div>
        </div>
        <div className="relative hidden h-full flex-col bg-[#E2DCFF] text-white dark:border-r lg:pt-10 lg:ps-10 lg:flex md:rounded-3xl">
            <div className="d-block text-black text-4xl w-[500px]">Find a job through your community</div>
          <div className="relative z-20 md:h-full md:flex md:items-center">
            <img src="assets/images/18.png" className="md:h-full md:rounded-3xl" alt="image register" />
          </div>
        </div>
      </div>
    </>
  )
}