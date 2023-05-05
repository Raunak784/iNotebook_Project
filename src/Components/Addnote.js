import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote } = context;

    const [note, setNote] = useState({title: "",description: "", tag: ""})

    const handleClick= (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "",description: "", tag: ""})
        props.showAlert('Added Successfully', "Success" )

    }

    const onChange= (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
         <div className='container my-3'>
            <h2 className='text-center'>Add Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} minLength={5} required onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description'value={note.description} minLength={5} required onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag'value={note.tag} minLength={3} required onChange={onChange}/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>

        </div>
    </div>
  )
}

export default Addnote