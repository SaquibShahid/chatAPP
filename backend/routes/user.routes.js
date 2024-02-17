import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { usersForSidebar } from '../controllers/user.controller.js';
const router = express.Router();

router.get("/sidebar-users" , protectRoute , usersForSidebar);

export default router;