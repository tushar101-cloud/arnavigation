const Location = require('../models/Location');

// Create a new location
exports.createLocation = async (req, res) => {
    try {
        const location = new Location(req.body);
        await location.save();
        res.status(201).json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all locations
exports.getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single location
exports.getLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a location
exports.updateLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a location
exports.deleteLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
