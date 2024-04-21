require('dotenv').config({ path: '.env' });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const signIn = async (req, res, next) => {

    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user) return res.status(400).json({ message: "User not found" });
    
        
        if (!(await bcrypt.compare(req.body.password, user.password))) return res.status(401).json({ token: null, message: "Invalid password" });
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 //24 horas
        });

        res.json({ token });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    signIn
};