// Import required modules
const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')

// Initialize express app
const app = express()

// Configure environment variables
dotenv.config()

// Create MySQL connection
const db = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Connect to the database
db.connect((err) => {
    if (err) {
    console.error('Database connection failed:', err.stack)
    return
  }
  console.log('Connected to database.')
})

// Middleware to parse JSON
app.use(express.json())

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients'
    db.query(sql, (err, results) => {

    if (err) {
        res.status(500).send('Server error')
        return
    }
    res.json(results)
})
})

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers'
    db.query(sql, (err, results) => {
    if (err) {
        res.status(500).send('Server error')
        return
    }
    res.json(results)
})
})

// Question 3: Filter patients by first name
app.get('/patients/:first_name', (req, res) => {
    const { first_name } = req.params
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?'
    db.query(sql, [first_name], (err, results) => {
    if (err) {
        res.status(500).send('Server error')
        return
    }
    res.json(results)
})
})

// Question 4: Retrieve all providers by their specialty
app.get('/providers/specialty/:specialty', (req, res) => {
    const { specialty } = req.params
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?'
    db.query(sql, [specialty], (err, results) => {
    if (err) {
        res.status(500).send('Server error')
        return
    }
    res.json(results)
})
})

// Listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
