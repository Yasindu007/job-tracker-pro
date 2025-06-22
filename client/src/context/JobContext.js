import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  // Fetch jobs on load
  useEffect(() => {
    if (token) {
      fetchJobs();
    }
  }, [token]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  const addJob = async (job) => {
    try {
      const res = await axios.post("/api/jobs", job, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs([...jobs, res.data]);
    } catch (err) {
      console.error("Failed to add job:", err);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};
