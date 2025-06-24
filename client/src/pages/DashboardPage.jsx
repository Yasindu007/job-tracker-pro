import { useContext, useEffect, useState } from "react";
import { JobContext } from "../context/JobContext";
import { Link } from "react-router-dom"; // at top


export default function Dashboard() {
  const {
    jobs,
    addJob,
    deleteJob,
    updateJob,
    getJobs,
  } = useContext(JobContext);

  const [form, setForm] = useState({ title: "", company: "", status: "applied", note: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  // Suggestions
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getJobs({ search: "", status: "all", sort: "latest" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateJob(editingId, form);
      setEditingId(null);
    } else {
      await addJob(form);
    }
    setForm({ title: "", company: "", status: "applied", note: "" });
  };

  const handleEdit = (job) => {
    setForm({ title: job.title, company: job.company, status: job.status, note: job.note || "" });
    setEditingId(job._id);
  };

  const handleSearch = () => {
    getJobs({ search: searchTerm, status: statusFilter, sort: sortOrder });
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(value.toLowerCase()) ||
        job.company.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(value ? filtered.slice(0, 5) : []);
  };

  useEffect(() => {
    getJobs({ search: searchTerm, status: statusFilter, sort: sortOrder });
    // eslint-disable-next-line
  }, [statusFilter, sortOrder]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">📋 Job Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search job title or company"
          value={searchTerm}
          onChange={handleSearchInput}
          className="border px-3 py-2 rounded w-60"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🔍 Search
        </button>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-2 rounded"
        >
          <option value="all">All Statuses</option>
          <option value="applied">Pending</option>
          <option value="interview">Interview</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-2 py-2 rounded"
        >
          <option value="latest">Date: Newest</option>
          <option value="oldest">Date: Oldest</option>
        </select>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="border rounded p-2 w-60 bg-white shadow-md">
          {suggestions.map((job) => (
            <li
              key={job._id}
              className="text-sm py-1 px-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => window.location.href = `/job/${job._id}`}
            >
              {job.title} at {job.company}
            </li>                    
          ))}
        </ul>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-4 border"
      >
        <h2 className="text-xl font-semibold">{editingId ? "✏️ Edit Job" : "➕ Add Job"}</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Job Title"
            required
            className="border p-2 rounded flex-1"
          />
          <input
            name="company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company"
            required
            className="border p-2 rounded flex-1"
          />
          <select
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="applied">Pending</option>
            <option value="interview">Interview</option>
            <option value="offered">Offered</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <textarea
          name="note"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          placeholder="Add a note (optional)"
          className="border p-2 rounded w-full mt-2 resize-y"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editingId ? "💾 Update Job" : "➕ Add Job"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ title: "", company: "", status: "applied", note: "" });
              }}
              className="text-gray-500 hover:text-red-600"
            >
              ❌ Cancel
            </button>
          )}
        </div>
      </form>

      {/* Job List */}
      <div className="grid gap-4">
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="flex justify-between items-start border p-4 rounded-md bg-gray-50 shadow-sm"
            >
              <div>
                <Link to={`/job/${job._id}`} target="_blank" rel="noopener noreferrer">
                  <h3 className="font-semibold text-lg hover:underline">{job.title}</h3>
                </Link>
                <p className="text-sm text-gray-600">{job.company}</p>
                <span
                  className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded ${
                    job.status === "applied"
                      ? "bg-yellow-200 text-yellow-800"
                      : job.status === "interview"
                      ? "bg-blue-200 text-blue-800"
                      : job.status === "offered"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {job.status === "applied" ? "Pending" : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
                {job.note && (
                  <p className="text-xs text-gray-500 mt-2 whitespace-pre-line">
                    📝 {job.note}
                  </p>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteJob(job._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
