import User from "../models/user.model.js";
import bycrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";

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
            generateTokenAndSetCookie(newUser._id , res)
            await newUser.save();
            return res.status(200).json({
                message : "user successfully created",
                fullName : newUser.fullName,
                username : newUser.username,
                profilePic : newUser.profilePic,
                gender : newUser.gender
            });
    }
        else {
            return res.status(500).json({message : "Invalid user data"});
        }
    } catch (e) {
        console.log("error in login controller" , e.message);
        return res.status(500).json({message : e.message});
    }
}

export const login = async (req,res)=>{
    try {
        const {username , password} = req.body;
        const user = await User.findOne({username: username});
        const isPasswordCorrect = await bycrypt.compare(password, user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(500).json({message : "Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id,res);

        return res.status(200).json({
            fullName : user.fullName,
            username : user.username,
            profilePic : user.profilePic,
            _id : user._id
        })
    } catch (e) {
        console.log("error in login controller" , e.message);
        return res.status(500).json({message : e.message});
    }
}

export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({message : "User logged out successfully"});
    } catch (e) {
        console.log("error in logout controller" , e.message);
        return res.status(500).json({message : e.message});
    }
}