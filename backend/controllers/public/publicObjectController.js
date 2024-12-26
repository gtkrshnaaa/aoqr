// controllers/publicObjectController.js
const objectModel = require('../../models/objectModel');

exports.getAllPublicObjects = async (req, res) => {
    try {
        const objects = await objectModel.findAll();
        res.status(200).json(objects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch objects' });
    }
};

exports.getPublicObjectById = async (req, res) => {
    try {
        const { id } = req.params;
        // Increment views count
        await objectModel.incrementViews(id);
        
        const object = await objectModel.findById(id);

        if (object) {
            res.status(200).json(object);
        } else {
            res.status(404).json({ error: 'Object not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch object' });
    }
};
