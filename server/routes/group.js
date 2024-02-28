import express from "express";
import { addGroup, getGroup,searchGroup } from "../controllers/group.js";

const router = express.Router();

router.post("/", addGroup);

router.get("/", getGroup);

router.get("/search", searchGroup);

export default router;