import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  // Fetch jobs when token changes
  useEffect(() => {
    if (token) {
      getJobs(); // default fetch with no filters
    } else {
      setJobs([]); // clear on logout
    }
  }, [token]);


  const getJobs = async ({ search = "", status = "all", sort = "latest" } = {}) => {
    try {
        const res = await axios.get("/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, status, sort },
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
      setJobs((prevJobs) => [...prevJobs, res.data]);
    } catch (err) {
      console.error("Failed to add job:", err);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  const updateJob = async (id, updatedData) => {
    try {
      const res = await axios.put(`/api/jobs/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === id ? res.data : job))
      );
    } catch (err) {
      console.error("Failed to update job:", err);
    }
  };

  return (
    <JobContext.Provider
    value={{ jobs, addJob, deleteJob, updateJob, getJobs }}
    >
      {children}
    </JobContext.Provider>
  );
};
