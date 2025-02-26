import React, { useState } from 'react';
import axios from 'axios';

const AdvertiserDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rewardAmount, setRewardAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/ads/create', {
        title,
        description,
        advertiserId: '123', // Replace with actual advertiser ID
        rewardAmount,
      });
      console.log('Ad created:', response.data);
    } catch (err) {
      console.error('Error creating ad:', err);
    }
  };

  return (
    <div>
      <h1>Advertiser Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ad Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Ad Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reward Amount"
          value={rewardAmount}
          onChange={(e) => setRewardAmount(e.target.value)}
        />
        <button type="submit">Create Ad</button>
      </form>
    </div>
  );
};

export default AdvertiserDashboard;