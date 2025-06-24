import { useContext, useState } from "react";
import { JobContext } from "../context/JobContext";

export default function AddJob() {
  const { addJob } = useContext(JobContext);
  const [form, setForm] = useState({
    title: "",
    company: "",
    status: "applied",
    note: "", // <-- change from notes to note
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addJob(form);
    setForm({
      title: "",
      company: "",
      status: "applied",
      note: "", // <-- Reset note too
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">➕ Add a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border p-2 rounded-md w-full"
        />
        <input
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          required
          className="border p-2 rounded-md w-full"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        >
          <option value="applied">Pending</option>
          <option value="interview">Interview</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* ✅ Notes Field */}
        <textarea
          name="note"
          placeholder="Notes (e.g., reached out via email)"
          value={form.note}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          rows={3}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Job
        </button>
      </form>
    </div>
  );
}
