// do i have to use Mutate here?no just for the tasks idk yet why 
// because it is server state managing and not should be used for sending request to the server

import { http } from "./http"
import type { AuthReponse, LoginRequest, ResgisterRequest, Task } from "./Type"

export async function register(params: ResgisterRequest): Promise<AuthReponse> {
    const res = await http.post("/auth/signup", params)
    return res.data
}

export async function login(params: LoginRequest): Promise<AuthReponse> {
    const res = await http.post("/auth/login", params)
    if (res.data.length === 0)
        throw new Error("Invalid username or password")
    return res.data
}

export async function logout() {
    await http.post("/auth/logout")
}

//---------------todo------------//

export async function createTask(params: Task) {
    const res = await http.post("/addToDo", params)
    return res.data
}

export async function updateTask(params: Task) {
    const res = await http.put("/updateTask", params)
    return res.data
}
export async function deleteTask() {
    await http.delete("/delete")
}