const express = require('express');
const Ad = require('../models/Ad');
const router = express.Router();

// Create Ad
router.post('/create', async (req, res) => {
  const { title, description, advertiser, rewardAmount } = req.body;
  try {
    const ad = new Ad({ title, description, advertiser, rewardAmount });
    await ad.save();
    res.status(201).json({ message: 'Ad created successfully', ad });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List Ads
router.get('/list', async (req, res) => {
  try {
    const ads = await Ad.find().populate('advertiser', 'name email');
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Click Ad
router.post('/click/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    ad.clicks += 1;
    await ad.save();
    // Reward the user (to be implemented later)
    res.status(200).json({ message: 'Ad clicked successfully', ad });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;