import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handle = (e) => {
        try {
            e.preventDefault();
            addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" })
            props.showAlert("Note Added successfully", "Success")
        } catch (error) {
            props.showAlert("Internal Server Error ", "Please try again")
        }
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form>
                <h1 style={{ color: props.mode === '#e3f2fd' ? '#042743' : 'white' }}>Add a Note</h1>
                <div className="form-group my-3">
                    <label htmlFor="title">  <h3 style={{ color: props.mode === '#e3f2fd' ? '#042743' : 'white' }}>Title</h3></label>

                    <input type="text" className="form-control" name="title" id="title" aria-describedby="emailHelp" placeholder=" Enter Title" value={note.title} onChange={onchange} style={{ backgroundColor: props.mode === '#e3f2fd' ? 'white' : '#120d1a', color: props.mode === '#e3f2fd' ? '#042743' : 'white', border: "none" }} />
                </div>
                <div className="form-group">
                    <label htmlFor="description"><h3 style={{ color: props.mode === '#e3f2fd' ? '#042743' : 'white' }}>Description</h3></label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Description" value={note.description} onChange={onchange} style={{ backgroundColor: props.mode === '#e3f2fd' ? 'white' : '#120d1a', color: props.mode === '#e3f2fd' ? '#042743' : 'white', border: "none" }} />
                </div>
                <div className="form-group">
                    <label htmlFor="Tag"><h3 style={{ color: props.mode === '#e3f2fd' ? '#042743' : 'white' }}>Tag</h3></label>
                    <input type="text" className="form-control" id="tag" name="tag" placeholder="Tag" value={note.tag} onChange={onchange} style={{ backgroundColor: props.mode === '#e3f2fd' ? 'white' : '#120d1a', color: props.mode === '#e3f2fd' ? '#042743' : 'white', border: "none" }} />
                </div>

                <button disabled={note.title.length < 3 || note.description.length < 3} type="submit" className="btn btn-light" onClick={handle}><h5>Submit</h5></button>
            </form>
        </div>
    )
}

export default AddNote
