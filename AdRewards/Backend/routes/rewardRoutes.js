const express = require('express');
const Reward = require('../models/Reward');
const User = require('../models/User');
const router = express.Router();

// Redeem Reward (Airtime)
router.post('/redeem', async (req, res) => {
  const { userId, phoneNumber } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.rewardBalance < 10) { // Minimum balance for redemption
      return res.status(400).json({ error: 'Insufficient reward balance' });
    }

    // Deduct reward balance
    user.rewardBalance -= 10; // Example: Redeem 10 units for airtime
    await user.save();

    // Send airtime via Africa's Talking API
    const AfricaSTalking = require('africastalking');
    const africastalking = AfricaSTalking({
      apiKey: process.env.AFRICASTALKING_API_KEY,
      username: 'sandbox', // Use 'sandbox' for testing
    });

    const airtime = africastalking.AIRTIME;
    const options = {
      recipients: [{
        phoneNumber: phoneNumber,
        amount: 10, // Amount in currency (e.g., KES)
        currencyCode: 'KES',
      }],
    };

    airtime.send(options)
      .then((response) => {
        console.log('Airtime sent:', response);
        res.status(200).json({ message: 'Reward redeemed successfully', response });
      })
      .catch((err) => {
        console.error('Error sending airtime:', err);
        res.status(500).json({ error: 'Failed to send airtime' });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;