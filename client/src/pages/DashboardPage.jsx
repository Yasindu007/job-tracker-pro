import { useContext, useState } from "react";
import { JobContext } from "../context/JobContext";

export default function DashboardPage() {
  const { jobs, addJob, deleteJob } = useContext(JobContext);
  const [form, setForm] = useState({ title: "", company: "", status: "Pending" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addJob(form);
    setForm({ title: "", company: "", status: "Pending" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Job Tracker Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
            className="border p-2 rounded-md flex-1"
          />
          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            required
            className="border p-2 rounded-md flex-1"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Interview">Interview</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          ➕ Add Job
        </button>
      </form>

      <div className="mt-8 grid gap-4">
        {jobs.length === 0 && <p className="text-gray-500">No jobs added yet.</p>}
        {jobs.map((job) => (
          <div
            key={job._id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border"
          >
            <div>
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
              <span
                className={`inline-block px-2 py-1 mt-1 rounded text-xs font-medium ${
                  job.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : job.status === "Interview"
                    ? "bg-blue-100 text-blue-800"
                    : job.status === "Offered"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {job.status}
              </span>
            </div>
            <button
              onClick={() => deleteJob(job._id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
