const express = require('express')
const router = express.Router()
const Drink = require('../models/Drink')

// Get all drinks
router.get('/drinks', async (req, res) => {
    try {
        const drinks = await Drink.findAll()
        res.json(drinks)
    } catch (error) {
        console.error('Error fetching drinks:', error)
        res.status(500).json({ error: error.message })
    }
})

// Get a specific drink
router.get('/drinks/:id', async (req, res) => {
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

// Create a new drink
router.post('/drinks', async (req, res) => {
    try {
        const drink = await Drink.create(req.body)
        res.status(201).json(drink)
    } catch (error) {
        console.error('Error creating drink:', error)
        res.status(400).json({ error: error.message })
    }
})

// Get core drinks
router.get('/coredrinks', async (req, res) => {
    try {
        const drinks = await Drink.findAll({
            where: {
                category: 'core'
            }
        })
        res.json(drinks)
    } catch (error) {
        console.error('Error fetching core drinks:', error)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router