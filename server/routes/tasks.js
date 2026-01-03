import express from "express"
import pool from "../db.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

//create task
router.post("/", protect, async(req, res) => {
    const { title, project_id } = req.body;

    const task = await pool.query(
        "INSERT INTO tasks(title,project_id,user_id) VALUES($1,$2,$3) RETURNING *",
        [title, project_id, req.user.id]
    );

    res.json(task.rows[0]);
});

//get tasks of a project
router.get("/:projectId", protect, async(req, res) => {
    const tasks = await pool.query(
        "SELECT * FROM tasks WHERE project_id=$1",
        [req.params.projectId]
    );

    res.json(tasks.rows);
});

export default router;