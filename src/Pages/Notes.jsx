import NotesNavbar from "../Components/NotesNavbar";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

let notes = JSON.parse(localStorage.getItem("notes")) || [];
const Notes = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
    const isEditMode = Boolean(id);
  let currentNote = notes.find((note) => note.id == id);
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleAddNotes = (event) => {
    event.preventDefault();
  
    let note = {
      title: title,
      description: description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id: crypto.randomUUID(),
    };
    notes.push(note);
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
    window.location.href = "http://localhost:5173/";
  };

  const  updateNote=() => {
    currentNote.title = title;
    currentNote.description = description;
    currentNote.updatedAt = Date.now();
    localStorage.setItem("notes", JSON.stringify(notes));
    navigate("/");
  }
  const deleteNote = () => {
  notes = notes.filter((note)=> note.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes) );
  navigate("/");
};

  return (
    <>
      <Header />
      <NotesNavbar />
      <div className="flex  flex-col gap-3 mx-auto max-w-[700px]">
        <main className="gap-3 flex flex-col">
          <form onSubmit={handleAddNotes}>
            <div>
              <input
                id="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Type Your Notes Title"
                className="bg-[#F7F7F7] p-3 w-full max-w-[700px] text-[20px] "
                required
              />
            </div>
            <div>
              <textarea
                id="description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Type Yours Notes Body"
                className="bg-[#F7F7F7] p-3 w-full max-w-[700px] text-[20px] mt-3"
                required
              ></textarea>
            </div>
            <div className="flex justify-between">
              {!isEditMode && (
                <button
                  type="submit"
                  className="bg-[#437993] p-3 rounded-[8px] hover:cursor-pointer mt-3 text-white"
                >
                  Add Note
                </button>
              )}
              {isEditMode && (
                <button
                  type="button"
                  onClick={updateNote}
                  className="bg-[#437993] p-3 rounded-[8px] hover:cursor-pointer mt-3 text-white"
                >
                  Update Note
                </button>
              )}
              {isEditMode && (
                <button
                  type="button"
                  onClick={deleteNote}
                  className="bg-[#437993] p-3 rounded-[8px] hover:cursor-pointer mt-3 text-white "
                >
                  Remove Note
                </button>
              )}
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default Notes;
