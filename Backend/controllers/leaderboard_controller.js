import User from '../models/user.js';

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

export const addpoints = async (req, res) => {
    try {
        const { id } = req.params;
        const { points } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { $inc: { points: points } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        
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

export const getSortedUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ points: -1 });
        res.status(200).json({
            success: true,
            users,
            message:"leaderboard refreshed successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};