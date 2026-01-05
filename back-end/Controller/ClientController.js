import bcrypt from "bcrypt";
import { query } from "../db.js"; 

export const GetData = async (req, res) => {
  try {
    // Get the user_id from query parameters
    const user_id = req.query.user_id;
    
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    
    // Filter transactions by user_id
    const { rows } = await query("SELECT * FROM tracker WHERE user_id = $1", [user_id]);
    console.log("Data fetched successfully for user:", user_id);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const InsertData = async (req, res) => {
  try {
    const { user_id, title, amount, type, category, date } = req.body;

    const { rows } = await query(
      `INSERT INTO tracker (user_id, title, amount, type, category, date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, title, amount, type, category, date || new Date()]
    );

    console.log("Transaction inserted successfully");
    res.json(rows[0]);
  } catch (error) {
    console.error("Error inserting transaction:", error);
    res.status(500).json({ error: "Failed to insert transaction" });
  }
};

// 🧑 SIGN UP a new user
export const SIGN_UP= async (req, res) => {
  try {
    console.log("Signup request received:", req.body);
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const { rows } = await query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hashed_password]
    );

    console.log("User created successfully");
    res.status(201).json({ success: true, user: rows[0] });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const Login = async (req, res) => {
  try {
    console.log("Login request received:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "INVALID EMAIL OR PASSWORD" });
    }

    const user = result.rows[0];

    const auth = await bcrypt.compare(password, user.password_hash);

    if (auth) {
      return res.json({ success: true, message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
    } else {
      return res.status(401).json({ error: "INVALID EMAIL OR PASSWORD" });
    }
  } catch (error) {
    console.error("Login error:", error.message, error.stack);
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};
