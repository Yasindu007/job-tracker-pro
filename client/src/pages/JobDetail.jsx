import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function JobDetail() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJob(res.data);
      } catch (err) {
        console.error("Error loading job", err);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <p className="p-4 text-gray-600">Loading job...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600 text-sm">Company: {job.company}</p>
      <p className="text-sm">Status: {job.status}</p>
      <p className="text-sm">Applied: {new Date(job.dateApplied).toLocaleDateString()}</p>
      {job.note && <p className="mt-4 text-sm">Notes: {job.note}</p>}
    </div>
  );
}
