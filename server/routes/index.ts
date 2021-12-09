import express from "express";
import { TICKETS_URL, USERS_URL } from "../routes.constants";
import ticketsRoutes from "./tickets.routes";
import usersRoutes from "./users.routes";

const router = express.Router();

router.use(USERS_URL, usersRoutes);
router.use(TICKETS_URL, ticketsRoutes);

export default router;
