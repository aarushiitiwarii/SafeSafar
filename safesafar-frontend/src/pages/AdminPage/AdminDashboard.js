// src/pages/AdminPage/AdminDashboard.js
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/admin/users");
    const data = await res.json();
    setUsers(data.users || data);
  };

  const addUser = async () => {
    await fetch("http://localhost:5000/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`http://localhost:5000/admin/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Add User</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role (e.g., admin, police, government)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>

      <h3>Users</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.email} – {u.role}
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
