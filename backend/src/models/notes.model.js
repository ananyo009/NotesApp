const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength:[100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: true,
        maxlength:[1000, 'Description cannot be more than 1000 characters']

    },
}, {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: 'last_modified'
    }
})

const noteModel = mongoose.model('notes', noteSchema); 

module.exports = noteModel;