//do i have to use Mutate here?no just for the tasks idk yet why 

import { http, setAccessToken } from "./http"
import type { LoginRequest, AuthReponse, ResgisterRequest } from "./Type"


export async function register(payload: ResgisterRequest): Promise<AuthReponse> {
    const res = await http.post("/users/register", payload)
    setAccessToken(res.data.accessToken)
    return res.data
}

export async function login(payload: LoginRequest): Promise<AuthReponse> {
    const res = await http.post("/users", {
        params: {
            email: payload.email,
            password: payload.password,
        }
    })
    if (res.data.length === 0) {
        throw new Error("Invalid email or password")
    }

    return res.data
}

export async function logout() {
    await http.post("/users/logout")
    setAccessToken(null)
}