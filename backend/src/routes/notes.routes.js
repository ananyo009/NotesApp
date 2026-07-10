const express = require('express');

const notesRouter = express.Router();

const { createNote, readNote, deleteNote, updateNote, partialUpdateNote } = require('../controller/notes.controller');

const identifyUser = require("../middleware/identifyuser")

notesRouter.post('/create', identifyUser, createNote);
notesRouter.get('/read', identifyUser, readNote);
notesRouter.put('/update/:id', identifyUser, updateNote);
notesRouter.delete('/delete/:id', identifyUser, deleteNote);
notesRouter.patch('/partialupdate/:id', identifyUser, partialUpdateNote);

module.exports = notesRouter;