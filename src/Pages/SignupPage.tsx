import { useState } from "react"
import { register } from "../API/auth"
import { useMutation } from "@tanstack/react-query"

export default function SignupPage() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const mutationRegister = useMutation({
        mutationFn: register,
        onSuccess: (res) => {
            console.log(res)
        }, onError: (e) => {
            console.log(e.message)
        }

    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault
        mutationRegister.mutate({ name, email, password })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Insert youe name :</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="">Insert your email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="">Insert your password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={mutationRegister.isPending}>
                    {mutationRegister.isPending ? "Registering ...." : "Submit"}
                </button>
            </form>
            {mutationRegister.isError && (<div> {mutationRegister.error.message}</div>)}
        </>
    )
}