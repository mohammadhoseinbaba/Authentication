
export interface User {
    id: string;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

//--------Auth-------------

export interface ResgisterRequest {
    name: string;
    email: string;
    password: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthReponse {
    accessToken: string;
    user?: User;
}

//--------------Task--------------

export interface Task {
    task: string
}