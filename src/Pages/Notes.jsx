import NotesNavbar from "../Components/NotesNavbar";
import Header from "../Components/Header";
import { useState } from "react";

let notes = JSON.parse(localStorage.getItem("notes")) || [];
const Notes = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const handleAddNotes = (event) => {
    event.preventDefault();
    const Title = document.getElementById("title").value;
    const Description = document.getElementById("description").value;
    let note = {
      title: Title,
      description: Description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id: crypto.randomUUID(),
    };
    notes.push(note);
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
    window.location.href = "http://localhost:5173/";
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
              <button
                type="submit"
                id="addBtn"
                className="bg-[#437993] p-3 rounded-[8px] hover:cursor-pointer mt-3 text-white"
              >
                Add Notes
              </button>
              <button
                type="button"
                onClick="updateNote()"
                id="updateBtn"
                className="bg-[#437993] p-3 rounded-[8px] hover:cursor-pointer mt-3 text-white hidden"
              >
                Update Note
              </button>
              <button
                type="button"
                id="deleteBtn"
                onClick="deleteNote()"
                className="bg-[#437993] p-3 rounded-[8px] hover:cursor-pointer mt-3 text-white hidden"
              >
                Remove Note
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default Notes;
