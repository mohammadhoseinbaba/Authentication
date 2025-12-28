import axios from "axios"
import { useAuthStore } from "../Store/useAuthStore"

export const http = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
})
// simple refresh managment

// let accessToken: string | null = localStorage.getItem("accesstoken")

// export const setAccessToken = (token: string | null) => {
//   accessToken = token
//   if(token) localStorage.setItem("accessToken" , token)
//     else localStorage.removeItem("accessToken")
// }
// export const getAccessToken = () => {
//   return accessToken
// }

//using presist middleware
//this method is better because of safty reactivity and clean code

http.interceptors.request.use(
  (config) => {
    console.log("request is sending ...." + config.url)
    const token = useAuthStore.getState().accessToken

    if (token) {
      config.headers.Authorization = `bearer ${token}`
    }
    return config
  },

  (error) => Promise.reject(error)

)

http.interceptors.response.use(

  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("unauthorized ==> redirect to login ")
    }
    return Promise.reject(error)
  }
)