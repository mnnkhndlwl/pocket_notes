import Group from "../models/Group.js";
import Note from "../models/Note.js";
import { createError } from "../utils/error.js";

export const addNote = async (req, res, next) => {
  try {
    const { content, groupId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      next(createError(404, "Group Not found"));
    }
    const note = new Note({ content, group: groupId });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNote = async (req, res, next) => {
  try {
    const notes = await Note.find({ group: req.params.groupId });
    if (!notes) {
      next(createError(404, "Notes Not found"));
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// search notes
export const searchNote = async (req, res, next) => {
  try {
    const query = req.query?.query;
    const notes = await Note.find({ name: { $regex: query, $options: 'i' } });
    res.status(200).json(notes);
} catch (err) {
    res.status(500).json({ message: err.message });
}
};