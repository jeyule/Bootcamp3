const Note = require('../models/note.model.js');

//create and save new note
exports.create = (req, res) => {
    //validate req
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    //create note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

    //save note in db
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating note."
        });
    });
};

//retrieve and return all notes
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

//find single note w/ id
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

//update note id by id
exports.update = (req, res) => {
    //validate req
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    //find and update w/ req body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found w/ id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found w/ id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note w/ id " + req.status.noteId
        });
    });
};

//dete note w/ id
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found w/ id " + req.params.noteId
            });
        }
        res.send({message: "Note delete successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found w/ id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Could not delete note w/ id " + req.params.noteId
        });
    });
};