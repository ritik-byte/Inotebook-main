import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
  // Add a NOTE
  const getNote = async () => {
    try{
    const response = await fetch(`${host}/api/notes/fetchNote`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "AuthToken": localStorage.getItem('token')
      }
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
  catch(error){
    alert("Internal server Error ,Notes cannot be fetched");
  }

  }
  const addNote = async (title, description, tag) => {
    try{
    const response = await fetch(`${host}/api/notes/createnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "AuthToken": localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })

    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }
  catch(error){
    alert("Note not Added , Please try Again..")
  }
  }

  // Edit a NOTE
  const editNote = async (id, title, description, tag) => {
    try{
    const response = await fetch(`${host}/api/notes//updateNote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "AuthToken": localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })

    });
    const json = await response.json();
    console.log(json);

    let newnotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }

    }
    setNotes(newnotes)
  }
  catch(error){
    alert("Note not Updated , Please try Again...");
  }
  }

  // Delete a NOTE
  const deleteNode =async (id) => {
    try{
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "AuthToken": localStorage.getItem('token')

      },

    });
    const json = await response.json();
    console.log(json);
    const newnote = notes.filter((note) => { return note._id !== id });
    setNotes(newnote);
  }
  catch(error){
    alert("Note cannot be deleted  , Please try Again...")
  }
  }

  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNode, getNote }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;