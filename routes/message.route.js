import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js"
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route('/api/v1/send/:id').post(isAuthenticated , sendMessage);
router.route('/api/v1/all/:id').get(isAuthenticated , getMessage);

export default router ;