import express from "express";
import ticketsRoutes from "./tickets.routes";
import usersRoutes from "./users.routes";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/tickets", ticketsRoutes);

export default router;
