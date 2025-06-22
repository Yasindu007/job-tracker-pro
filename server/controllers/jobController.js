const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
  const jobs = await Job.find({ user: req.user._id }).sort("-dateApplied");
  res.json(jobs);
};

exports.getJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

exports.createJob = async (req, res) => {
  const job = await Job.create({ ...req.body, user: req.user._id });
  res.status(201).json(job);
};

exports.updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: "Job deleted" });
};
