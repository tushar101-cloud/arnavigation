const express = require('express');
const locationController = require('../controllers/locationController');

const router = express.Router();

// Create a new location
router.post('/', locationController.createLocation);

// Get all locations
router.get('/', locationController.getLocations);

// Get a single location
router.get('/:id', locationController.getLocation);

// Update a location
router.put('/:id', locationController.updateLocation);

// Delete a location
router.delete('/:id', locationController.deleteLocation);

module.exports = router;
