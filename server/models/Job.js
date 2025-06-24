const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  status: {
    type: String,
    enum: ["applied", "interview", "offered", "rejected"],
    default: "applied",
  },
  note: { type: String }, // ✅ Add this
  dateApplied: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Job", jobSchema);

if (sort === "oldest") result = result.sort("dateApplied");
else result = result.sort("-dateApplied");

if (status && status !== "all") {
  query.status = status;
}
