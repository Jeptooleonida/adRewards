const express = require('express');
const Ad = require('../models/Ad');
const User = require('../models/User');
const Reward = require('../models/Reward');
const router = express.Router();

// Create Ad
router.post('/create', async (req, res) => {
  const { title, description, advertiserId, rewardAmount } = req.body;
  try {
    const advertiser = await User.findById(advertiserId);
    if (!advertiser) {
      return res.status(404).json({ error: 'Advertiser not found' });
    }

    const ad = new Ad({ title, description, advertiser: advertiserId, rewardAmount });
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

// Click Ad (Earn Reward)
router.post('/click/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const ad = await Ad.findById(id);
    const user = await User.findById(userId);

    if (!ad || !user) {
      return res.status(404).json({ error: 'Ad or user not found' });
    }

    // Increment ad clicks
    ad.clicks += 1;
    await ad.save();

    // Reward the user
    const reward = new Reward({ user: userId, ad: id, amount: ad.rewardAmount });
    await reward.save();

    // Update user's reward balance
    user.rewardBalance += ad.rewardAmount;
    await user.save();

    res.status(200).json({ message: 'Ad clicked successfully', reward });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;