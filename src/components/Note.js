import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Note = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;

  // const {addNote} = context;
  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" })

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const ref = useRef(0)
  const refclose = useRef(0)
  const update = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag })
  }

  const handle = (e) => {
    try {
      e.preventDefault();
      editNote(note.id, note.title, note.description, note.tag);
      refclose.current.click();
      props.showAlert("Updated Successfully", "Success")
    } catch (error) {
      props.showAlert("Internal Server Error ", "Please try again")
    }
  }
  let navigate = useNavigate()
  useEffect(() => {
    // eslint-disable-next-line
    if (localStorage.getItem('token')) {
      getNote()

    }
    else {
      navigate("/login")
    }
  }, [])
  return (
    <div>
      <AddNote mode={props.mode} showAlert={props.showAlert} />
      <div>

        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          UpdateNote
        </button>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ Color: props.mode === '#e3f2fd' ? 'white' : '#042743' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: props.mode === '#e3f2fd' ? 'rgb(210, 252, 252)' : '#042743', color: props.mode === '#e3f2fd' ? '#042743' : 'white' }}>
                <h5 className="modal-title" id="staticBackdropLabel">Edit the Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" style={{ backgroundColor: props.mode === '#e3f2fd' ? 'rgb(210, 252, 252)' : '#042743', color: props.mode === '#e3f2fd' ? '#042743' : 'white' }}>
                <form>
                  <h1>Edit Note</h1>
                  <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" name="title" id="title" aria-describedby="emailHelp" value={note.title} placeholder={note.title} onChange={onchange} style={{ backgroundColor: props.mode === '#e3f2fd' ? 'white' : '#120d1a', color: props.mode === '#e3f2fd' ? '#042743' : 'white', border: "none" }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder={note.description} onChange={onchange} style={{ backgroundColor: props.mode === '#e3f2fd' ? 'white' : '#120d1a', color: props.mode === '#e3f2fd' ? '#042743' : 'white', border: "none" }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder={note.tag} onChange={onchange} style={{ backgroundColor: props.mode === '#e3f2fd' ? 'white' : '#120d1a', color: props.mode === '#e3f2fd' ? '#042743' : 'white', border: "none" }} />
                  </div>

                </form>
              </div>
              <div className="modal-footer" style={{ backgroundColor: props.mode === '#e3f2fd' ? 'rgb(210, 252, 252)' : '#042743', color: props.mode === '#e3f2fd' ? '#042743' : 'white' }}>
                <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.title.length < 3 || note.description.length < 3} type="button" className="btn btn-primary" onClick={handle}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="my-3" style={{ color: props.mode === '#e3f2fd' ? '#042743' : 'white' }}>Your Notes</h2>
      <div className="row my-3">
        <div className="container">
          {notes.length === 0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem update={update} key={note._id} note={note} mode={props.mode} />;
        })}
      </div>
    </div>
  )
}

export default Note
