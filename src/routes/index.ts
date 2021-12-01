import express from "express";
import ticketsRoutes from './tickets.routes'

const router = express.Router();

router.use("/tickets", ticketsRoutes);

export default router;
