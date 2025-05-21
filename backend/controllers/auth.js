import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Product from "../models/Product.js";


export const user = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) return res.status(404).json({ msg: 'User not found' })
        res.json(user)
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'Server error' });
    }
}

export const bakers = async (req, res) => {
    try {
        const bakers = await User.find({ role: 'admin' }).select('-password');
        if (bakers.length === 0) {
            return res.status(404).json({ msg: 'No bakers found' });
        }
        res.json(bakers);
    } catch (error) {
        console.error('Error fetching bakers:', error);
        return res.status(500).json({ success: false, msg: 'Server error' });
    }
};

export const baker = async (req, res) => {
    const { bakerId } = req.params;
    try {
        const products = await Product.find({ baker: bakerId }); // assuming "baker" field stores user ID
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
}


export const register = async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ msg: "User already exists" })

        user = new User({ name, email, password, role })
        await user.save()

        const payload = { userId: user.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json({ success: true, token })
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'Server error' });
    }
}

// export const login = async (req, res) => {
//     const { email, password } = req.body
//     try {
//         const user = await User.findOne({ email })
//         if (!user) return res.status(400).json({ msg: 'Invalid credentials' })

//         const isMatch = await bcrypt.compare(password, user.password)
//         if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

//         const payload = { userId: user.id }
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

//         res.json({ success: true, token, userData: { name: user.name, email: user.email, role: user.role } })
//     } catch (error) {
//         return res.status(500).json({ success: false, msg: 'Server error' });
//     }
// }

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Ensure role exists, defaulting to 'user' if not present
        const userData = {
            name: user.name,
            email: user.email,
            role: user.role || 'user',  // Default to 'user' if no role is assigned
        };

        res.json({
            success: true,
            token,
            userData,
        });
    } catch (error) {
        console.error('Login error:', error); // Add more logging to identify issues
        return res.status(500).json({ success: false, msg: 'Server error' });
    }
};