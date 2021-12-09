import express from "express";
import { SERVER_URL } from "../routes.constants";
import ticketsRoutes from "./tickets.routes";
import usersRoutes from "./users.routes";

const router = express.Router();

router.use(SERVER_URL.users, usersRoutes);
router.use(SERVER_URL.tickets, ticketsRoutes);

export default router;
