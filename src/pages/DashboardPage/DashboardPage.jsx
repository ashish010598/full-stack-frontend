import React, { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import "./DashboardPage.scss";

const DashboardPage = () => {
  const [stats, setStats] = React.useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/api/drives/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };
    fetchStats();
  }, [token]);

  const pieData = [
    { name: "Vaccinated", value: stats?.vaccinatedStudents || 0 },
    {
      name: "Not Vaccinated",
      value: (stats?.totalStudents || 0) - (stats?.vaccinatedStudents || 0),
    },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  const today = new Date().toDateString();

  const ongoingDrives = stats?.upcomingDrives.filter(
    (d) => new Date(d.date).toDateString() === today
  );

  const upcomingDrives = stats?.upcomingDrives.filter(
    (d) => new Date(d.date) > new Date()
  );

  return (
    <div className="dashboard-container">
      <h2>📊 Dashboard Overview</h2>

      {stats ? (
        <>
          <div className="stats">
            <div className="card">
              <h3>Total Students</h3>
              <p>{stats.totalStudents}</p>
            </div>
            <div className="card">
              <h3>Vaccinated Students</h3>
              <p>{stats.vaccinatedStudents}</p>
            </div>
            <div className="card">
              <h3>Vaccination %</h3>
              <p>{stats.percentage}%</p>
            </div>
          </div>

          <div className="chart-and-upcoming">
            <div className="chart-box">
              <h3>Vaccination Coverage</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="upcoming-box">
              <h3>⏳ Ongoing Drives</h3>
              {ongoingDrives.length === 0 ? (
                <p className="no-drives">No drives for today.</p>
              ) : (
                <ul>
                  {ongoingDrives.map((drive, i) => (
                    <li key={i}>
                      <strong>{drive.vaccineName}</strong>
                      <br />
                      <span>
                        Doses: {drive.availableDoses} | Classes:{" "}
                        {drive.applicableClasses.join(", ")}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <h3>📅 Upcoming Drives</h3>
              {upcomingDrives.length === 0 ? (
                <p className="no-drives">
                  No upcoming drives in the next 30 days.
                </p>
              ) : (
                <ul>
                  {upcomingDrives.map((drive, i) => (
                    <li key={i}>
                      <strong>{drive.vaccineName}</strong> on{" "}
                      {moment(drive.date).format("DD/MM/YYYY")} <br />
                      <span>
                        Doses: {drive.availableDoses} | Classes:{" "}
                        {drive.applicableClasses.join(", ")}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
};

export default DashboardPage;
