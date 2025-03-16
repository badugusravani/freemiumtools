import express from 'express';
import { protect, admin } from '../middleware/auth';
import Ad from '../models/Ad';

const router = express.Router();

// @route   GET /api/ads
// @desc    Get all ads
// @access  Public
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find().sort({ position: 1 });
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/ads/position/:position
// @desc    Get ads by position
// @access  Public
router.get('/position/:position', async (req, res) => {
  try {
    const ads = await Ad.find({
      position: req.params.position,
      isActive: true,
    });
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/ads
// @desc    Create a new ad
// @access  Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, position, adCode, isActive } = req.body;

    const ad = await Ad.create({
      name,
      position,
      adCode,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json(ad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/ads/:id
// @desc    Update an ad
// @access  Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, position, adCode, isActive } = req.body;
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    ad.name = name || ad.name;
    ad.position = position || ad.position;
    ad.adCode = adCode || ad.adCode;
    ad.isActive = isActive !== undefined ? isActive : ad.isActive;

    const updatedAd = await ad.save();
    res.json(updatedAd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/ads/:id
// @desc    Delete an ad
// @access  Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    await ad.deleteOne();
    res.json({ message: 'Ad removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 