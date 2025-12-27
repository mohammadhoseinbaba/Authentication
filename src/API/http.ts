import axios from "axios"

const API_BASE_URL = "http://localhost:3001"

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
})


let accessToken: string | null = null

export function setAccessToken(token: string | null) {
  const accessToken = token
}

export function getAccessToken() {
  return accessToken
}