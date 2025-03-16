import express from 'express';
import { protect, admin } from '../middleware/auth';
import Category from '../models/Category';

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/categories
// @desc    Create a new category
// @access  Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { id, title, description, color, order } = req.body;

    const categoryExists = await Category.findOne({ id });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category ID already exists' });
    }

    const category = await Category.create({
      id,
      title,
      description,
      color,
      order: order || 0,
    });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update a category
// @access  Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { title, description, color, order } = req.body;
    const category = await Category.findOne({ id: req.params.id });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.title = title || category.title;
    category.description = description || category.description;
    category.color = color || category.color;
    category.order = order !== undefined ? order : category.order;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete a category
// @access  Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.deleteOne();
    res.json({ message: 'Category removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 