import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(500)
        .json({ error: "Unauthorized - token not provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(500).json({ error: "Unauthorized - invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(500).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
export default protectRoute;