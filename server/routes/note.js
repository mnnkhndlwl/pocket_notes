import express from "express";
import { addNote,getNote,searchNote } from "../controllers/note.js";

const router = express.Router();

router.post("/", addNote);

router.get("/:groupId", getNote);

router.get("/search", searchNote);

export default router;