import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [ads, setAds] = useState([]);
  const [rewardBalance, setRewardBalance] = useState(0);

  useEffect(() => {
    // Fetch ads
    axios.get('http://localhost:5000/api/ads/list')
      .then((response) => setAds(response.data))
      .catch((err) => console.error('Error fetching ads:', err));

    // Fetch user reward balance (replace with actual user ID)
    axios.get('http://localhost:5000/api/users/123')
      .then((response) => setRewardBalance(response.data.rewardBalance))
      .catch((err) => console.error('Error fetching reward balance:', err));
  }, []);

  const handleClickAd = async (adId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/ads/click/${adId}`, {
        userId: '123', // Replace with actual user ID
      });
      console.log('Ad clicked:', response.data);
    } catch (err) {
      console.error('Error clicking ad:', err);
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <h2>Your Reward Balance: {rewardBalance}</h2>
      <div>
        <h3>Available Ads</h3>
        {ads.map((ad) => (
          <div key={ad._id}>
            <h4>{ad.title}</h4>
            <p>{ad.description}</p>
            <button onClick={() => handleClickAd(ad._id)}>Click to Earn Reward</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;