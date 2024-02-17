import User from "../models/user.model.js";

export const usersForSidebar = async(req,res) =>{
    try {
        const loggedInUserId = req.user._id;
        const user = await User.findById(loggedInUserId).select({_id:1});
        if(!user){
            return res.status(500).json({error : "User not found"});
        }
        const users = await User.find({_id : {$ne : loggedInUserId}}).select({__v:0 , password : 0});
        if(users.length===0){
            return res.status(500).json({error : "Users not found"});
        }
        return res.status(200).json({users : users});
    } catch (e) {
        return res.status(500).json({error : e.message});
    }
}