import express from "express";
const router = express.Router();
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";


router.post("/send/:receiverId", protectRoute , sendMessage);
router.get("/:receiverId", protectRoute , getMessages);

export default router;