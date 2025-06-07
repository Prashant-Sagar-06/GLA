const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Use homepageRoutes instead of deanRoutes
const homepageRoutes = require("./routes/homepageRoutes");
const culturalClubRoutes = require('./routes/CulturalClubRoutes');
const councilRoutes = require('./routes/CouncilRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// API routes
app.use("/api", homepageRoutes);
app.use('/api', culturalClubRoutes);
app.use('/api/council-members', councilRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
