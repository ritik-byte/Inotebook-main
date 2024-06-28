const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



//Route 1 : Fetch all Notes of user
router.get('/fetchNote', fetchuser, async (req, res) => {
    try {
        const Notes = await Note.find({ user: req.user.id });
        res.json(Notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")

    }
})


// Route 2 Add a new Note
router.post('/createnote', fetchuser, [
    body('title', "Mininum length is 3 for title").isLength({ min: 3 }),
    body('description', "Enter a valid Decription").isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {
        const NewNote = new Note({ user: req.user.id, title, description, tag });
        const saveNote = await NewNote.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")

    }
})



//ROUTE 3 : Update a node
router.put('/updateNote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag };

    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("NOT FOUND") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("NOT ALLOWED");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }



})


// ROUTE 4 : DELETE A NOTE 
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
     const {title , description,tag}=req.body;
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("NOT FOUND") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("NOT ALLOWED");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Deleted" ,note :note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured")
    }
})

module.exports = router