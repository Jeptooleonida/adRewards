const mongoose = require('mongoose');

const adSchema = new mongoose.Schema( {
    title: {type:String, required:true},
    description: {type:String, required:true},
    advertiser:{type:mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    rewardAmount: { type:Number, required: true},
    clicks: { type: Number, default:0},
    createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Ad', adSchema)