const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/multer');
const authMiddleware = require('../middleware/authMiddleware')


const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '15m' } // Access token valid for 15 minutes
    );

    const refreshToken = jwt.sign(
        { userId: user._id }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: '7d' } // Refresh token valid for 7 days
    );

    return { accessToken, refreshToken };
};


router.get('/', async (req, res) => { // this route is useful for getting all the users 
    const users = await User.find();
    if(!users) {
        return res.status(400).json({message: "users not found"});
    }

    try {
        res.send(users);
    }
    catch (error) {
        res.status(401).json({message: "There is an error while fetching errors", error});
    }
});

router.post('/refresh-token', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

        // Check if refresh token exists in DB
        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(403).json({ message: "Invalid refresh token" });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Forbidden" });

            const newAccessToken = jwt.sign(
                { userId: decoded.userId },
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );

            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        console.error("❌ Refresh Token error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/register', async (req, res) => {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
        return res.status(400).json({ message: "Invalid or undefined fields" });
    }

    try {
        const salt = await bcrypt.genSalt(10); // Fixed method name
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, name, email, password: hashpassword });
        await newUser.save(); // Await saving

        res.status(201).json({ message: "User registered successfully" }); // Send response
    } catch (error) {
        console.error("Error:", error); // Log the error
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("🔍 Login Attempt:", email);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user);
        
        // Store refresh token in database
        user.refreshToken = refreshToken;
        await user.save();

        console.log("✅ Login Successful, Tokens Generated");
        
        res.json({ accessToken, refreshToken, user });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
})

router.get('/profile',authMiddleware,  async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error("❌ Profile Route Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
})

router.post('/logout', authMiddleware, async (req, res) => {
    try {
        // Remove refresh token from the database
        await User.findByIdAndUpdate(req.user.userId, { refreshToken: null });
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("❌ Logout error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update Profile (Photo & Description)
router.put('/profile', authMiddleware, upload.single('profilePhoto'), async (req, res) => {
    try {
        const { description } = req.body;
        const updatedData = { description };

        // If a new profile photo is uploaded, update the photo path
        if (req.file) {
            updatedData.profilePhoto = req.file.path;
        }

        const user = await User.findByIdAndUpdate(req.user.userId, updatedData, { new: true });
        res.json(user);
    } catch (error) {
        console.error("❌ Profile Update error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
