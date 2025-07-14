import User from '../models/user.js';
import PointHistory from '../models/pointhistory.js';


//THESE ARE ALL THE CONTROLLERS OF THE LEADERBOARD SYSTEM


//Controller to create a new user,creates a new user with name and points in the User model with default points=0
export const createuser= async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            return res.status(404).json({
                message:"User name cant be empty!"
            })
        }
        const user=await User.create({name})
        
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


//Controller for updating points generated from the frontend and createing a point history of the user in the pointhistory model.
export const addpoints = async (req, res) => {
    try {
        const { id } = req.params;
        const { points } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { $inc: { points: points } },        //increments the points 
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
  
  //Creates a new object for point history everytime a points are added to a user      
        await PointHistory.create({
            user: user._id,
            points: points,
            timestamp: new Date()
        });
       
        res.status(200).json({
            success: true,
            message: "Points added successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Controller for sending all the created users from the User model in response

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Controller for sending all the users in descending order from the User model on the basis of points

export const getSortedUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ points: -1 });     //sorts points in descending order
        res.status(200).json({
            success: true,
            users,                                                 //sends the sorted users in response
            message:"leaderboard refreshed successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};