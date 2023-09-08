import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote} = context;
  const navigate = useNavigate();

  useEffect(() => {
         if (localStorage.getItem("token")) {
            getNotes();
        } else {
            navigate("/login");
        }
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({id:"",etitle:" ", edescription:" ", etag:"default"});
  
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id: currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    
  };

  const handleClick = (event) => {
    // addNote(note.title,note.description,note.tag);
    // event.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Note updated","success");
  }; 

  const onChange = (event) => {
      
      setnote({...note,[event.target.name]: event.target.value});

  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="d-none btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title of a Note
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="conatiner mx-2">
        {notes.length===0 && "No Note To Display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
