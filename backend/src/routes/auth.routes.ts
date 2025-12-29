import { Router } from "express"
import { login, register, me } from "../controllers/auth.controllers.js"
import { requireAuth } from "../types/auth.js"

const router = Router()

router.post("/signup", register)
router.post("/login", login)
router.get("/me", requireAuth, me)

export default router