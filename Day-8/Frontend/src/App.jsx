import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [notes, setNotes] = useState([]);

  function fetchNotes(){
    axios
      .get("http://localhost:3000/notes")
      .then((res) => {
        setNotes(res.data.note);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(e){
    e.preventDefault();

    const {title,description}=e.target.elements

    console.log(title.value,description.value);

    axios.post("http://localhost:3000/notes",{
      title:title.value,
      description:description.value
    })
      .then(res=>{
        console.log(res.data)
        fetchNotes()
      })
  }

  function handleDeleteNote(noteId){ 
    axios.delete("http://localhost:3000/notes/"+noteId)
      .then(res=>{
        console.log(res.data)
        fetchNotes()
      })
  }

  function updateDescription(noteId){
    const description=prompt("Enter new description:")

    axios.patch("http://localhost:3000/notes/"+noteId,{
      description:description
    })
      .then(res=>{
        console.log(res.data)
        fetchNotes()
      })
  }

  useEffect(() => {
    fetchNotes()
  }, []);

  return (
    <>
      <form className="note-create-form flex gap-10 m-1" onSubmit={handleSubmit}>
          <input className="bg-white rounded-md" type="text" name="title" placeholder="Enter Title:"/>
          <input className="bg-white rounded-md p-2" type="text" name="description" placeholder="Enter Description:"/>
          <button className="bg-green-600 rounded-md" type="submit">Create Note</button>
          
      
      </form>

      <div className="notes flex gap-2 flex-wrap">
        {notes.map((note) => (
          <div key={note._id} className="note text-white bg-blue-400 p-3 rounded-md m-3">
            <h1>{note.title}</h1>
            <h2>{note.description}</h2>
            <button onClick={()=>{handleDeleteNote(note._id)}} className="bg-red-600 rounded-md p-1 cursor-pointer">Delete</button>
            <button onClick={()=>{updateDescription(note._id)}} className="bg-yellow-500 rounded-md ml-1 p-1 cursor-pointer">Modify</button>
          </div>
        ))}
      </div>

    </>

  );
}