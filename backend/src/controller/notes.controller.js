const noteModel = require("../models/notes.model")
const userModel = require("../models/user.model")

async function createNote(req, res) {
    const user = await userModel.findById(req.user.id);
    const { title, description } = req.body;
    const note = await noteModel.create({
        user: user._id,
        title,
        description
    })

    res.status(201).json(note);
}

async function readNote(req, res) {


    const notes = await noteModel.find({user: req.user.id}).populate("user")
    res.status(200).json({
            note:notes
    });
}

async function deleteNote(req, res) {
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Note deleted successfully' });
}

async function updateNote(req, res) {
    const id = req.params.id;
    const { title, description } = req.body;
    const note = await noteModel.findByIdAndUpdate(id, { title, description }, { new: true, runValidators: true });
    res.status(200).json(note);
}

async function partialUpdateNote(req, res) {
    const id = req.params.id;
    const {description} = req.body
    const note = await noteModel.findByIdAndUpdate(id, {description});
    res.status(200).json({
        message: "note update successfully",
        note
    });
}

module.exports = {
    createNote,
    readNote,
    deleteNote,
    updateNote,
    partialUpdateNote
}