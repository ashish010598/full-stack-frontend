import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsRequest } from "../../redux/student/actions";

import "./StudentsPage.scss";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.students);
  const [form, setForm] = useState({ name: "", class: "", studentId: "" });
  const [file, setFile] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentForVaccination, setSelectedStudentForVaccination] =
    useState(null);
  const [activeDrives, setActiveDrives] = useState([]);
  const [selectedDriveId, setSelectedDriveId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchStudentsRequest());
    const fetchDrives = async () => {
      const res = await axios.get("http://localhost:8081/api/drives", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const today = new Date().toDateString();
      const eligibleDrivesForStudent = res.data.filter(
        (d) =>
          new Date(d.date).toDateString() === today &&
          d.applicableClasses.includes(selectedStudentForVaccination.class)
      );
      setActiveDrives(eligibleDrivesForStudent);
    };
    fetchDrives();
  }, [selectedStudentForVaccination, dispatch, token]);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/students", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(fetchStudentsRequest());
      setForm({ name: "", class: "", studentId: "" });
    } catch (err) {
      console.error("Add student failed", err);
    }
  };

  const handleUploadCSV = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:8081/api/students/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(fetchStudentsRequest());
      setFile(null);
    } catch (err) {
      console.error("CSV upload failed", err);
    }
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkVaccinated = async () => {
    if (!selectedDriveId) return;
    try {
      await axios.put(
        `http://localhost:8081/api/students/vaccinate/${selectedStudentForVaccination._id}`,
        {
          vaccineName: activeDrives.find((d) => d._id === selectedDriveId)
            .vaccineName,
          date: new Date(),
          driveId: selectedDriveId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchStudentsRequest());
      setSelectedStudentForVaccination(null);
      setSelectedDriveId("");
    } catch (err) {
      console.error("Vaccination failed:", err);
    }
  };

  return (
    <div className="students-page">
      <h2>👨‍🎓 Student Management</h2>

      <div className="actions">
        <form onSubmit={handleAddStudent}>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={form.class}
            onChange={(e) => setForm({ ...form, class: e.target.value })}
            required
          />
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
            required
          />
          <button type="submit">➕ Add Student</button>
        </form>

        <div className="upload-box">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={handleUploadCSV} disabled={!file}>
            📤 Upload CSV
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search by name or student ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <h3>📋 Student List</h3>

      <div className="table-wrapper">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Student ID</th>
                <th>Vaccinations</th>
                <th>Mark Vaccinate</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, index) => (
                <tr key={index}>
                  <td>{s.name}</td>
                  <td>{s.class}</td>
                  <td>{s.studentId}</td>
                  <td>
                    <span
                      className="vaccination-count"
                      onClick={() => setSelectedStudent(s)}
                      style={{
                        cursor: "pointer",
                        color: "#00c6ff",
                        textDecoration: "underline",
                      }}
                    >
                      {s.vaccinationRecords?.length || 0}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedStudentForVaccination(s)}
                      className="vaccinate-btn"
                    >
                      ✅ Vaccinate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedStudent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>🧾 Vaccination Records</h3>
            <p>
              <strong>{selectedStudent.name}</strong>
            </p>

            {selectedStudent.vaccinationRecords?.length > 0 ? (
              <table className="vaccination-table">
                <thead>
                  <tr>
                    <th>Vaccine Name</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudent.vaccinationRecords.map((v, i) => (
                    <tr key={i}>
                      <td>{v.vaccineName}</td>
                      <td>{moment(v.date).format("DD/MM/YYYY")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No vaccinations found.</p>
            )}

            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      {selectedStudentForVaccination && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedStudentForVaccination(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Vaccinate {selectedStudentForVaccination.name}</h3>
            <select
              value={selectedDriveId}
              onChange={(e) => setSelectedDriveId(e.target.value)}
            >
              <option value="">Select a drive</option>
              {activeDrives.map((drive, i) => (
                <option key={i} value={drive._id}>
                  {drive.vaccineName} –{" "}
                  {new Date(drive.date).toLocaleDateString()}
                </option>
              ))}
            </select>
            <button onClick={handleMarkVaccinated} disabled={!selectedDriveId}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
