import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../db.js'

const router = express.Router();

//REGISTER
router.post("/register", async(req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await pool.query(
        "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email",
        [name, email, hashed]
    );

    res.json(user.rows[0]);
    console.log("User registered");
});

//LOGIN
router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    const user = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    //check if user present
    if(!user.rows.length) return res.status(400).json("User not found!");

    //check validity of password
    const valid = await bcrypt.compare(password, user.rows[0].password);
    if(!valid) return res.status(400).json("Password unmatched!");

    //jwt sign token
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);

    res.json({ token });
    console.log("User authorized");
});

export default router;