import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { JobContext } from "../context/JobContext";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { updateJob } = useContext(JobContext);
  const [form, setForm] = useState({ title: "", company: "", status: "applied", note: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm({
          title: res.data.title,
          company: res.data.company,
          status: res.data.status,
          note: res.data.note || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to load job", err);
        navigate("/");
      }
    };

    fetchJob();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateJob(id, form);
    navigate("/");
  };

  if (loading) return <p className="p-6">Loading job details...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="Job Title"
        />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="Company Name"
        />
        <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="applied">Pending</option>
          <option value="interview">Interview</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>
        <textarea
          name="note"
          placeholder="Additional Notes"
          value={form.note}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          rows={4}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Job
        </button>
      </form>
    </div>
  );
}