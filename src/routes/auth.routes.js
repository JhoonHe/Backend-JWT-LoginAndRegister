import { Router } from "express";
import { login, register, info } from "../controllers/auth.controller.js";
import { verificacion } from "../middlewares/auth.verificacion.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/info', verificacion, info)

export default router;