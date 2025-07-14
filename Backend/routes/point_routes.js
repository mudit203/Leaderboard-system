import express from "express";
import { addpoints } from "../controllers/leaderboard_controller.js";


const router=express.Router();
router.route('/add/:id').put(addpoints);


export default router;