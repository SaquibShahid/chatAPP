import User from "../models/user.model.js";
import bycrypt from 'bcryptjs';
export const signup = async (req,res)=>{
    try {
        const {fullName , username , password , confirmPassword , gender} = req.body;
        if(password != confirmPassword){
            return res.status(500).json({error : "password does not match"})
        }
        const user = await User.findOne({username : username}).select({_id:1});
        if(user){
            return res.status(500).json({error : "username already exists"});
        }

        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password , salt);

        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            profilePic : gender === "male" ? maleProfilePic : femaleProfilePic,
            gender,
        });
        if(newUser){
            await newUser.save();
        return res.status(200).json({
            message : "user successfully created",
            fullName : newUser.fullName,
            username : newUser.username,
            profilePic : newUser.profilePic,
            gender : newUser.gender
        })
    }
        else {
            res.status(500).json({message : "Invalid user data"});
        }
    } catch (e) {
        return res.status(500).json({message : e.message});
    }
}
export const login = (req,res)=>{
    res.send("login in controller")
}
export const logout = (req,res)=>{
    res.send("logout in controller")
}