import Group from "../models/Group.js";
import Note from "../models/Note.js";
import { createError } from "../utils/error.js";

export const addGroup = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    const group = new Group({ name, color });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all groups
export const getGroup = async (req, res, next) => {
  try {
    const group = await Group.find({});
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// search groups
export const searchGroup = async (req, res, next) => {
  try {
    const query = req.query?.query;
    const groups = await Group.find({ name: { $regex: query, $options: 'i' } });
    res.status(200).json(groups);
} catch (err) {
    res.status(500).json({ message: err.message });
}
};