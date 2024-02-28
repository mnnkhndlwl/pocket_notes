import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  },
  { timestamps: true }
);

export default mongoose.model("Note", NoteSchema);
