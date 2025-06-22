const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, enum: ["applied", "interview", "offered", "rejected"], default: "applied" },
  link: String,
  notes: String,
  dateApplied: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Job", JobSchema);