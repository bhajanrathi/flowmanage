import express from 'express'
import pool from "../db.js"
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router();

//create project
router.post("/", protect, async(req, res) => {
    const { name, description } = req.body;

    const project = await pool.query(
        "INSERT INTO projects(name,description,user_id) VALUES($1,$2,$3) RETURNING *",
        [name, description, req.user.id]
    );

    res.json(project.rows[0]);
});

//get user's projects
router.get("/", protect, async(req, res) => {
    const projects = await pool.query(
        "SELECT * FROM projects WHERE user_id=$1",
        [req.user.id]
    );

    res.json(projects.rows);
});

export default router;