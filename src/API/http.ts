import axios from "axios"

export const http = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
})

let accessToken: string | null = localStorage.getItem("accesstoken")

export const setAccessToken = (token: string | null) => {
  accessToken = token
  if(token) localStorage.setItem("accessToken" , token)
    else localStorage.removeItem("accessToken")
}
export const getAccessToken = () => {
  return accessToken
}

http.interceptors.request.use(
  (config) => {
    console.log("request is sending ...." + config.url)
    const token = getAccessToken()
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