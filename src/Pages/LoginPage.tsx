import { useState } from "react"
import { login } from "../API/auth"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import type { AuthReponse, LoginRequest } from "../API/Type"

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const loginMutation = useMutation<AuthReponse, Error, LoginRequest>({
        mutationFn: login,
        onSuccess: (res) => {
            localStorage.setItem("accessToken", res.accessToken)
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Enter your Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label htmlFor="">Enter your password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button type="submit" disabled={loginMutation.isPending}>{loginMutation.isPending ? "logging in ..." : "Submit"}</button>
            </form>

            {loginMutation.isError && (<div>{loginMutation.error.message}</div>)}
        </>
    )
}

