const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: get All The Notes using the GET "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
 
});

// ROUTE 2: All a new notes using: POST "/api/notes/addnote". Login required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title.").isLength({ min: 3 }),
    body("description", "Enter a valid Description.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there area error then return the bad request. and the error.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
  }
);

// ROUTE 3: Update the existing notes using: PUT "/api/notes/updatenote. Login required.
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //Create a new note object.
      const newNote = {};
      if (title) {newNote.title = title};
      if (description) {newNote.description=description};
      if(tag) {newNote.tag = tag};

      //Find the note to be updated and update it.
      let note = await Note.findById(req.params.id);
      if(!note){
        return res.status(404).send("Not found");
      }
      if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
      }
      note= await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
      res.json({note});
    }catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  // ROUTE 4: Delete the existing notes using: DELETE "/api/notes/deletenote. Login required.
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    try{
      //Find the note to be updated and update it.
      console.log(req.params.id);
      let note = await Note.findById(req.params.id);
      console.log(note)
      if(!note){
        return res.status(404).send("Not found");
      }
      if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
      }
      note= await Note.findByIdAndDelete(req.params.id)
      res.json({"Success": " Note have been deleted", note : note});
    }catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
