const express = require('express');
const moongose = require('moongose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// initialize app 
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
moongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then ( () => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

// test route
app.get('/', (req, res) =>{
    res.send("Ad Reward Backend running")
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
    
})