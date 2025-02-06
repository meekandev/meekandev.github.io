require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const CORS = require('cors')
const { testConnection, initializeDatabase } = require('./models/db')
const Drink = require('./models/Drink')

// Middleware
app.use(express.static('public'))
app.use('/PartnerHours',express.static(__dirname + '/public/PartnerHours'))
app.use('/Menu',express.static(__dirname + '/public/Menu'))
app.use('/coreDrinks',express.static(__dirname + '/public/CoreDrinks'))
app.use(express.static('IMG'))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(CORS())
app.use(express.urlencoded({ extended: true }))
app.use('/IMG', express.static(__dirname + '/IMG'))
app.use(express.json())

// Basic API Routes
app.get('/api/drinks', async (req, res) => {
    try {
        const drinks = await Drink.findAll()
        res.json(drinks)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get('/api/drinks/:id', async (req, res) => {
    try {
        const drink = await Drink.findByPk(req.params.id)
        if (drink) {
            res.json(drink)
        } else {
            res.status(404).json({ error: 'Drink not found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.post('/api/drinks', async (req, res) => {
    try {
        const drink = await Drink.create(req.body)
        res.status(201).json(drink)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Initialize database and start server
async function startServer() {
    try {
        await testConnection()
        await initializeDatabase()
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
    }
}

startServer()
