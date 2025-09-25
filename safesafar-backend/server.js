// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Supabase client with service role key (backend only)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ Get all users
app.get("/admin/users", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new user
app.post("/admin/users", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Create user in auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) throw error;

    // Save role in `profiles` table
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      role,
    });
    if (profileError) throw profileError;

    res.json({ message: "User created", user: data.user });
  } catch (err) {
    console.error("Error adding user:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete user
app.delete("/admin/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.auth.admin.deleteUser(id);
    if (error) throw error;
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
