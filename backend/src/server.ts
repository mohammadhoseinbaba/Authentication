import express from 'express' //backend framework
import cors from "cors" // it will let the frontend api to be accepted in the backend
import authRoutes from "./routes/auth.routes.js"//it will make routes for the req
import "dotenv/config";

const app = express()

app.use(express.json())

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)
app.get("/health", (_req, res) => res.json({ ok: true }))
app.use("/auth", authRoutes)

const PORT = Number(process.env.PORT) || 3000

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))