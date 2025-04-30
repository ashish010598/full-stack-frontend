import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsRequest } from "../../redux/student/actions";
import axios from "axios";

import "./StudentsPage.scss";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.students);
  const [form, setForm] = useState({ name: "", class: "", studentId: "" });
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchStudentsRequest());
  }, [dispatch]);

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
              </tr>
            </thead>
            <tbody>
              {students.map((s, index) => (
                <tr key={index}>
                  <td>{s.name}</td>
                  <td>{s.class}</td>
                  <td>{s.studentId}</td>
                  <td>{s.vaccinationRecords?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
