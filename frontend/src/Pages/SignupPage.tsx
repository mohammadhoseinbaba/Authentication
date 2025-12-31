import { useState } from "react"
import { register } from "../API/auth"
import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../Store/useAuthStore"
import { useNavigate } from "react-router-dom"

export default function SignupPage() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const setAuth = useAuthStore((s) => s.setAuth)
    const navigate = useNavigate()
    const mutationRegister = useMutation({
        mutationFn: register,
        onSuccess: (res) => {
            setAuth({ user: res.user, accessToken: res.accessToken })
            navigate("/dashboard")
        }, onError: (e) => {
            console.log(e.message)
        }

    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutationRegister.mutate({ name, email, password })
    }
    return (
        <>
            <form className="mx-auto max-w-md w-full mt-6 border-2 rounded-lg p-4 space-y-4" onSubmit={handleSubmit}>
                <label className="block" htmlFor="">Insert youe name </label>
                <input className="bg-gray-500 w-full placeholder:text-gray-300 text-white focus:outline-none px-4 py-2 focus:ring-2 focus:ring-sky-400 rounded"
                    placeholder="your name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label className="block" htmlFor="">Insert your email</label>
                <input className="bg-gray-500 w-full placeholder:text-gray-300 text-white focus:outline-none px-4 py-2 focus:ring-2 focus:ring-sky-400 rounded"
                    placeholder="abs@mail.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="block" htmlFor="">Insert your password</label>
                <input className="bg-gray-500 w-full py-2 px-4 focus:outline-none text-white focus:ring-2 focus:ring-sky-400 rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="w-full bg-sky-500 py-2 rounded text-white hover:bg-sky-700 font-bold  focus:outline-none   " type="submit" disabled={mutationRegister.isPending}>
                    {mutationRegister.isPending ? "Registering ...." : "Submit"}
                </button>
            </form>
            {mutationRegister.isError && (<div> {mutationRegister.error.message}</div>)}
        </>
    )
}