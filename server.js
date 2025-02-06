require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const CORS = require('cors')
const { testConnection, initializeDatabase } = require('./models/db')
const Drink = require('./models/Drink')

// Configure CORS for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://meekandev.github.io']
        : ['http://localhost:3000', 'http://localhost:8000'],
    optionsSuccessStatus: 200
}

// Middleware
app.use(CORS(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files
app.use(express.static('public'))
app.use('/PartnerHours', express.static(__dirname + '/public/PartnerHours'))
app.use('/Menu', express.static(__dirname + '/public/Menu'))
app.use('/coreDrinks', express.static(__dirname + '/public/CoreDrinks'))
app.use('/IMG', express.static(__dirname + '/IMG'))

// Basic API Routes
app.get('/api/drinks', async (req, res) => {
    try {
        const drinks = await Drink.findAll()
        res.json(drinks)
    } catch (error) {
        console.error('Error fetching drinks:', error)
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
        console.error('Error fetching drink:', error)
        res.status(500).json({ error: error.message })
    }
})

app.post('/api/drinks', async (req, res) => {
    try {
        const drink = await Drink.create(req.body)
        res.status(201).json(drink)
    } catch (error) {
        console.error('Error creating drink:', error)
        res.status(400).json({ error: error.message })
    }
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    })
})

// Initialize database and start server
async function startServer() {
    try {
        await testConnection()
        await initializeDatabase()
        
        app.listen(PORT, () => {
            console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
