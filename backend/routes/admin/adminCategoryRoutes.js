const express = require('express');
const categoryController = require('../../controllers/admin/adminCategoryController');
const router = express.Router();

router.post('/create', categoryController.createCategory);
router.get('/get-all', categoryController.getAllCategories);
router.get('/get-by-id/:id', categoryController.getCategoryById);
router.put('/update/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);

module.exports = router;
