import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import cors from 'cors'
import pool from './db.js'
import authRoutes from './routes/auth.js'
import projectRoutes from './routes/projects.js'
import taskRoutes from './routes/tasks.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => res.send("API running"));

pool.query("SELECT NOW()")
    .then(res => console.log("DB connected!"))
    .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running"));