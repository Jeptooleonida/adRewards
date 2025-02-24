const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema( {
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    ad: { type: mongoose.Schema.Types.ObjectId, ref:'Ad', required:true},
    amount: { type: Number, required:true},
    redeemed:{ type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model('Reward', rewardSchema)