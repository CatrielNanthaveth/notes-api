require('dotenv').config({ path: '.env' });
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.findAll();

        res.status(200).json(allUsers)
    } catch (error) {
        next(error);
    }
};

const getSingleUser = async (req, res, next) => {
    try {
        const user_id = req.params.id;

        const user = await User.findByPk(user_id);

        if (!user) return res.status(404).json({
            message: 'user not found'
        });

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    const { email, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name: username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 //24 horas
        });

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    };
};

const deleteUser = async (req, res, next) => {
    const user_id = req.params.id;

    try {
        const result = await User.destroy({
            where: {
                id: user_id
            }
        })

        if (!result) return res.status(404).json({
            message: 'user not found'
        });

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.findByPk(user_id)
        if (!user) return res.status(404).json({
            message: 'user not found'
        });
        user.email = email
        user.name = username
        user.password = hashedPassword
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser
};