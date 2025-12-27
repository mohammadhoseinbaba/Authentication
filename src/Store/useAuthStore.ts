//React Query with Zustand to store the Token
//or here?:)
// we should use the Zustand or redux to store the token and user here but now we dont have any backend to generate it !

import { create } from 'zustand'
import { setAccessToken } from '../API/http'
import type { User } from '../API/Type'

type Authstate = {
    user: User | null,
    accessToken: string | null,
    isAuthenticated: boolean,

    setAuth: (payload: { user: User, accessToken: string }) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<Authstate>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,

    setAuth: ({ user, accessToken }) => {
        setAccessToken(accessToken)
        set({
            user,
            accessToken,
            isAuthenticated: true,
        })
    },
    clearAuth: () => {
        setAccessToken(null)
        set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
        })
    },
}))