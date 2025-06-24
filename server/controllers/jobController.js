const Job = require("../models/Job");

// Get all jobs for user
const Job = require("../models/Job");

// Get all jobs with search, filter, sort
exports.getJobs = async (req, res) => {
  const { search, status, sort } = req.query;
  const query = { user: req.user._id };

  if (status && status !== "all") {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } }
    ];
  }

  let result = Job.find(query);

  if (sort === "oldest") result = result.sort("dateApplied");
  else result = result.sort("-dateApplied");

  const jobs = await result;
  res.json(jobs);
};

const getJobs = async (req, res) => {
  try {
    const { search, status, sort } = req.query;
    const query = { user: req.user._id };

    // Filter by status
    if (status && status !== "all") {
      query.status = status;
    }

    // Search by title or company
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } }
      ];
    }

    // Base query
    let result = Job.find(query);

    // Sort logic
    if (sort === "oldest") {
      result = result.sort("dateApplied");
    } else {
      result = result.sort("-dateApplied"); // newest first (default)
    }

    const jobs = await result;
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single job by ID
const getJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create job
const createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, user: req.user._id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: "Job not found" });

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
