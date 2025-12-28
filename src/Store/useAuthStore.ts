//React Query with Zustand to store the Token
//or here?:)
// we should use the Zustand or redux to store the token and user here but now we dont have any backend to generate it !

import { create } from 'zustand'
import { persist } from "zustand/middleware"
import type { User } from '../API/Type'

type Authstate = {
    user: User | null,
    accessToken: string | null,
    isAuthenticated: boolean,

    setAuth: (payload: { user: User, accessToken: string }) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<Authstate>()(
    persist(
        (set) => (
            {
                user: null,
                accessToken: null,
                isAuthenticated: false,

                setAuth: ({ user, accessToken }) => {
                    set({
                        user,
                        accessToken,
                        isAuthenticated: true,
                    })
                },
                clearAuth: () => {
                    set({
                        user: null,
                        accessToken: null,
                        isAuthenticated: false,
                    })
                },
            }),
        {
            name: "auth-storage", 
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)