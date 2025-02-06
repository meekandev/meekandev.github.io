require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const CORS = require('cors')
const path = require('path')
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
app.use('/PartnerHours', express.static(path.join(__dirname, 'public/PartnerHours')))
app.use('/Menu', express.static(path.join(__dirname, 'public/Menu')))
app.use('/coreDrinks', express.static(path.join(__dirname, 'public/CoreDrinks')))
app.use('/IMG', express.static(path.join(__dirname, 'IMG')))

// Import routes
const mainRoutes = require('./routes/main')
const apiRoutes = require('./routes/API')

// Route handlers
app.use('/', mainRoutes)
app.use('/api', apiRoutes)

// Direct route for POS
app.get('/pos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Menu/menu.html'))
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    })
})

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something broke!' })
})

// Initialize database and start server
async function startServer() {
    try {
        await testConnection()
        await initializeDatabase()
        
        app.listen(PORT, () => {
            console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
            console.log(`POS system available at: http://localhost:${PORT}/pos`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
