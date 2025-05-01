import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./DrivesPage.scss";

const DrivesPage = () => {
  const [drives, setDrives] = useState([]);
  const [form, setForm] = useState({
    vaccineName: "",
    date: null,
    totalDoses: "",
    applicableClasses: "",
  });
  const [editDrive, setEditDrive] = useState(null);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const token = localStorage.getItem("token");

  const fetchDrives = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/drives", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDrives(res.data);
    } catch (err) {
      console.error("Error fetching drives:", err);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const createDrive = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        "http://localhost:8081/api/drives",
        {
          ...form,
          applicableClasses: form.applicableClasses
            .split(",")
            .map((c) => c.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setForm({
        vaccineName: "",
        date: null,
        totalDoses: "",
        applicableClasses: "",
      });
      fetchDrives();
    } catch (err) {
      setError(err.response?.data?.error || "Drive creation failed.");
    }
  };

  const updateDrive = async () => {
    setError("");
    try {
      await axios.put(
        `http://localhost:8081/api/drives/${editDrive._id}`,
        {
          vaccineName: editDrive.vaccineName,
          date: editDrive.date,
          availableDoses: editDrive.availableDoses,
          applicableClasses: editDrive.applicableClasses
            .split(",")
            .map((c) => c.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditDrive(null);
      fetchDrives();
    } catch (err) {
      setError(err.response?.data?.error || "Update failed.");
    }
  };

  const getStatus = (dateStr) => {
    const today = new Date().toDateString();
    const driveDate = new Date(dateStr).toDateString();
    if (driveDate === today) return "in-progress";
    if (new Date(dateStr) > new Date()) return "upcoming";
    return "expired";
  };

  const filteredDrives = drives.filter((drive) => {
    const status = getStatus(drive.date);
    const matchStatus = statusFilter === "all" || status === statusFilter;
    const matchName = drive.vaccineName
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const matchDate =
      !dateFilter ||
      new Date(drive.date).toDateString() === dateFilter.toDateString();
    return matchStatus && matchName && matchDate;
  });

  return (
    <div className="drives-page">
      <h2>💉 Drive Management</h2>

      <form className="drive-form" onSubmit={createDrive}>
        <input
          type="text"
          placeholder="Vaccine Name"
          value={form.vaccineName}
          onChange={(e) => setForm({ ...form, vaccineName: e.target.value })}
          required
        />
        <DatePicker
          selected={form.date}
          onChange={(date) =>
            setForm({ ...form, date: moment(date).format("YYYY-MM-DD") })
          }
          minDate={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)} // min 15 days ahead
          placeholderText="Select Drive Date"
          className="datepicker"
          required
        />
        <input
          type="number"
          placeholder="Total Doses"
          value={form.totalDoses}
          onChange={(e) =>
            setForm({ ...form, totalDoses: Number(e.target.value) })
          }
          required
        />
        <input
          type="text"
          placeholder="Applicable Classes (comma separated)"
          value={form.applicableClasses}
          onChange={(e) =>
            setForm({ ...form, applicableClasses: e.target.value })
          }
          required
        />
        <button type="submit">➕ Create Drive</button>
        {error && <p className="error">{error}</p>}
      </form>

      <div className="drive-filters">
        <div className="status-filters">
          {["all", "expired", "upcoming", "in-progress"].map((status) => (
            <button
              key={status}
              className={statusFilter === status ? "active" : ""}
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by vaccine name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="search-input"
        />

        <DatePicker
          selected={dateFilter}
          onChange={(date) => setDateFilter(date)}
          placeholderText="Filter by date"
          className="datepicker"
          isClearable
        />
      </div>

      <h3>📋 All Drives</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Vaccine</th>
              <th>Date</th>
              <th>Total Doses</th>
              <th>Available Doses</th>
              <th>Available Classes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrives.map((drive, i) => {
              const status = getStatus(drive.date);
              return (
                <tr key={i}>
                  <td>{drive.vaccineName}</td>
                  <td>{moment(drive.date).format("DD/MM/YYYY")}</td>
                  <td>{drive.totalDoses}</td>
                  <td>{drive.availableDoses}</td>
                  <td>{drive.applicableClasses.join(", ")}</td>
                  <td className={status}>{status}</td>
                  <td>
                    {status === "upcoming" && (
                      <button onClick={() => setEditDrive({ ...drive })}>
                        ✏️ Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editDrive && (
        <div className="modal-overlay" onClick={() => setEditDrive(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Drive:</h3>
            <input
              type="text"
              placeholder="Search by vaccine name..."
              value={editDrive.vaccineName}
              onChange={(e) =>
                setEditDrive({ ...editDrive, vaccineName: e.target.value })
              }
              className="search-input"
            />
            <DatePicker
              selected={editDrive.date}
              onChange={(date) =>
                setEditDrive({
                  ...editDrive,
                  date: moment(date).format("YYYY-MM-DD"),
                })
              }
              minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} // min 15 days ahead
              placeholderText="Select Drive Date"
              className="datepicker"
              required
            />
            <input
              type="number"
              value={editDrive.availableDoses}
              onChange={(e) =>
                setEditDrive({
                  ...editDrive,
                  availableDoses: Number(e.target.value),
                })
              }
            />
            <input
              type="text"
              placeholder="Applicable Classes (comma separated)"
              value={editDrive.applicableClasses}
              onChange={(e) =>
                setEditDrive({
                  ...editDrive,
                  applicableClasses: e.target.value,
                })
              }
              required
            />
            <button onClick={updateDrive}>Save</button>
            <button onClick={() => setEditDrive(null)}>Cancel</button>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrivesPage;
