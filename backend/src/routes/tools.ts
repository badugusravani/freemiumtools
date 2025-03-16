import express from 'express';
import { protect, admin } from '../middleware/auth';
import Tool from '../models/Tool';

const router = express.Router();

// @route   GET /api/tools
// @desc    Get all tools
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tools = await Tool.find()
      .populate('category', 'id title color')
      .sort({ order: 1 });
    res.json(tools);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/tools/category/:categoryId
// @desc    Get tools by category
// @access  Public
router.get('/category/:categoryId', async (req, res) => {
  try {
    const tools = await Tool.find({ 'category.id': req.params.categoryId })
      .populate('category', 'id title color')
      .sort({ order: 1 });
    res.json(tools);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/tools
// @desc    Create a new tool
// @access  Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { id, title, description, category, componentCode, order, isActive } = req.body;

    const toolExists = await Tool.findOne({ id });
    if (toolExists) {
      return res.status(400).json({ message: 'Tool ID already exists' });
    }

    const tool = await Tool.create({
      id,
      title,
      description,
      category,
      componentCode,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    const populatedTool = await tool.populate('category', 'id title color');
    res.status(201).json(populatedTool);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/tools/:id
// @desc    Update a tool
// @access  Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { title, description, category, componentCode, order, isActive } = req.body;
    const tool = await Tool.findOne({ id: req.params.id });

    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    tool.title = title || tool.title;
    tool.description = description || tool.description;
    tool.category = category || tool.category;
    tool.componentCode = componentCode || tool.componentCode;
    tool.order = order !== undefined ? order : tool.order;
    tool.isActive = isActive !== undefined ? isActive : tool.isActive;

    const updatedTool = await tool.save();
    const populatedTool = await updatedTool.populate('category', 'id title color');
    res.json(populatedTool);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/tools/:id
// @desc    Delete a tool
// @access  Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const tool = await Tool.findOne({ id: req.params.id });

    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    await tool.deleteOne();
    res.json({ message: 'Tool removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 