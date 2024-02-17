import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res) =>{
    const token = jwt.sign({userId} , process.env.JWT_SECRET_KEY , {
        expiresIn : '15d'
    })
console.log(process.env.NODE_ENV , token);
res.cookie("jwt" , token , {
    maxAge : 15 * 24 * 60 * 60 * 1000 ,
    httpOnly : true , // prevent XSS attacks
    sameSite : "strict", // prevent cross-site requests forgery,
    secure : process.env.NODE_ENV !== "development"
})
}

export default generateTokenAndSetCookie;