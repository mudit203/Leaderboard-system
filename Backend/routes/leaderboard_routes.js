import express from "express";
import { createuser } from "../controllers/leaderboard_controller.js";
import { getAllUsers } from "../controllers/leaderboard_controller.js";
import { getSortedUsers } from "../controllers/leaderboard_controller.js";
const router=express.Router();
// Route to add a new user
// POST /user/add
router.route('/add').post(createuser);

// Route to get all users (unsorted)
// GET /user/getall
router.route('/getall').get(getAllUsers);

// Route to get users sorted by points (leaderboard)
// GET /user/sorted
router.route('/sorted').get(getSortedUsers);


export default router;