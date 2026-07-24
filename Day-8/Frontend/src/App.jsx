import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/notes")
      .then((res) => {
        setNotes(res.data.note);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="notes flex gap-2">
      {notes.map((note) => (
        <div
          key={note._id}
          className="note text-white bg-blue-400 p-3 rounded-md m-3"
        >
          <h1>{note.title}</h1>
          <h2>{note.description}</h2>
        </div>
      ))}
    </div>
  );
}