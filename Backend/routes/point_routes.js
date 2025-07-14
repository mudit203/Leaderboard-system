import express from "express";
import { addpoints } from "../controllers/leaderboard_controller.js";


const router=express.Router();

//Route to update points of the selected user with id
// PUT /points/add/:id
router.route('/add/:id').put(addpoints);


export default router;