const categoryModel = require('../../models/categoryModel');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const id = await categoryModel.create(name);
        res.status(201).json({ message: 'Category created', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};


exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findById(id);

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};


exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await categoryModel.update(id, name);
        res.status(200).json({ message: 'Category updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.delete(id);
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
