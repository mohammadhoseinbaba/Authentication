import { useState } from "react"
import { login } from "../API/auth"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import type { AuthReponse, LoginRequest } from "../API/Type"
import { useAuthStore } from "../Store/useAuthStore"
import { Button } from "../Components/Button"
export default function LoginPage() {
    const navigate = useNavigate()
    const useAuth = useAuthStore((s) => s.setAuth)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")



    const loginMutation = useMutation<AuthReponse, Error, LoginRequest>({
        mutationFn: login,
        onSuccess: (res) => {
            useAuth({ user: res.user, accessToken: res.accessToken })
            navigate("/dashboard")
        }, onError: (e) => {
            console.log(e.message)
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email || !password) return

        loginMutation.mutate({ email, password })
    }

    return (

        <>
                <form className="
    mx-auto mt-6 sm:mt-10
    w-full max-w-md
    border-2 rounded-lg
    p-4 sm:p-6
    space-y-4
  "
                    onSubmit={handleSubmit}>
                    <label className="block text-sm sm:text-base"
                        htmlFor="">Enter your Email</label>
                    <input
                        className=" w-full
        bg-gray-500 text-white placeholder:text-gray-300
        focus:outline-none focus:ring-2 focus:ring-sky-400
        rounded px-4 py-2
      "
                        placeholder="abs@mail.com"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                    <label className="block text-sm sm:text-base"
                        htmlFor="">Enter your password</label>
                    <input className="
        w-full
        bg-gray-500 text-white placeholder:text-gray-300
        focus:outline-none focus:ring-2 focus:ring-sky-400
        rounded px-4 py-2
      "
                        type="password"
                        onChange={(e) => setPassword(e.target.value)} value={password} />
                    <Button className="
      w-full
      bg-sky-300 text-white font-bold
      rounded
      py-2
      hover:bg-sky-700
      disabled:opacity-60 disabled:cursor-not-allowed
    "
                        type="submit"
                        disabled={loginMutation.isPending} >{loginMutation.isPending ? "logging in ..." : "Submit"}</Button>
                </form>
         
            {loginMutation.isError && (<div>{loginMutation.error.message}</div>)}

        </>
    )
}

