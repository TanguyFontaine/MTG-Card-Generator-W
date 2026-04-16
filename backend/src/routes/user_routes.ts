import express, { Router } from "express";
import { ROUTES } from "../../../shared/routes.js";
import { UserController } from "../controllers/user_controller.js";

const router: Router = express.Router();

router.post(ROUTES.USERS_REGISTER_URL, UserController.register);
router.post(ROUTES.USERS_LOGIN_URL, UserController.login);

export default router;
