import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/getUser", getUser);
router.post("/createUser", createUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/udpateUser/:id", updateUser);

export default router;
