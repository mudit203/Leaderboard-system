import express from "express";
import { createuser } from "../controllers/leaderboard_controller.js";
import { getAllUsers } from "../controllers/leaderboard_controller.js";
import { getSortedUsers } from "../controllers/leaderboard_controller.js";
const router=express.Router();
router.route('/add').post(createuser);
router.route('/getall').get(getAllUsers);
router.route('/sorted').get(getSortedUsers);


export default router;