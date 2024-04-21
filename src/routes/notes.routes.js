const { Router } = require('express');
const { getAllNotes, getSingleNote, getUserNotes, createNote, deleteNote, updateNote } = require('../controllers/notes.controllers');

const router = Router();

router.get('/notes', getAllNotes);

router.get('/notes/:id', getSingleNote);

router.get('/notes/by/user', getUserNotes);

router.post('/notes', createNote);

router.delete('/notes/:id', deleteNote);

router.put('/notes/:id', updateNote);

module.exports = router;