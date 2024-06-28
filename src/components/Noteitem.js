import React, { useContext } from 'react'
import noteContext from '../context/noteContext';


const Noteitem = (props) => {
    const context  = useContext(noteContext);
    const {note,update}  = props;
    const {deleteNode} = context;
    return (
        <div>
            <div className="card my-2 mx-2" style={{"width": "18rem" , border:"none"}}>
                <div className="card-body"  style={{backgroundColor: props.mode === '#e3f2fd' ? 'white' : '#042743', color: props.mode === '#e3f2fd' ? '#042743' : 'white' , border:"none" }}>
                    <div className="d-flex align-items-center">
                    <h5 className="card-title" > {note.title}</h5>
                        <i className="fa-solid fa-file-pen mx-2 " onClick={()=>{update(note)}} style={{"cursor":"pointer"}}></i>
                        <i className="fa-solid fa-trash  mx-2"onClick={()=>{deleteNode(note._id)}} style={{"cursor":"pointer"}}></i>
                    </div>
                    <p className="card-text"> {note.description}</p>
                    <p className="card-link">{note.tag}</p>
                   
                </div>
            </div>
        </div>
    )
}

export default Noteitem
