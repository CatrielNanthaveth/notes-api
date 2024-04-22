const Notes = require("../models/Notes");
const jwt = require('jsonwebtoken');

const getAllNotes = async (req, res, next) => {
    try {
        const allNotes = await Notes.findAll();
        res.json(allNotes);
    } catch (error) {
        next(error);
    }
};

const getUserNotes = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        let user_id;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            user_id = decoded.id;
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return res.status(401).json({ message: 'Invalid token' });
        } 

        console.log('User ID:', user_id);
        const userNotes = await Notes.findAll({
            where: {
                userId: user_id
            }
        })
        res.json(userNotes);
    } catch (error) {
        next(error);
    }
};

const getSingleNote = async (req, res, next) => {
    try {
        const note_id = req.params.id;

        const note = await Notes.findAll({
            where: {
                id: note_id
            }
        })

        if (!note) return res.status(404).json({
            message: 'Note not found'
        });
        res.json(note);
    } catch (error) {
        next(error);
    }
};

const createNote = async (req, res, next) => {
    try {
        const { title, description, status, category } = req.body;
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        let user_id;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            user_id = decoded.id;
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return res.status(401).json({ message: 'Invalid token' });
        } 

        const newNote = await Notes.create({
            title,
            category,
            description,
            status,
            userId: user_id
        })
        res.json(newNote);
    } catch (error) {
        next(error);
    };
};

const deleteNote = async (req, res, next) => {
    try {
        const note_id = req.params.id;

        const result = await Notes.destroy({
            where: {
                id: note_id
            }
        })
        if (!result) return res.status(404).json({
            message: 'Note not found'
        });

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateNote = async (req, res, next) => {
    try {
        const note_id = req.params.id;
        const { title, description, category, status, user_id } = req.body;

        const updatedNote = await Notes.findByPk(note_id);

        if (!updatedNote) return res.status(404).json({
            message: 'Note not found'
        });

        if(title) updatedNote.title = title;
        if(description) updatedNote.description = description;
        if(category) updatedNote.category = category;
        if(status) updatedNote.status = status;
        if(user_id) updatedNote.userId = user_id;

        await updatedNote.save();

        res.json(updatedNote);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllNotes,
    getUserNotes,
    getSingleNote,
    createNote,
    deleteNote,
    updateNote
};