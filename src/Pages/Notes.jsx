import NotesNavbar from "../Components/NotesNavbar";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || [],
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const currentNote = notes.find((note) => note.id == id);
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
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate("/");
  };

  const updateNote = () => {
    const updatedNotes = notes.map((note) => {
      if (note.id == id) {
        return {
          ...note,
          title: title,
          description: description,
          updatedAt: Date.now(),
        };
      }
      return note;
    });
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate("/");
  };
  const deleteNote = () => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes)
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate("/");
  };

  return (
    <>
      <Header />
      <NotesNavbar />
      <div className="flex  flex-col gap-3 mx-auto max-w-175">
        <main className="gap-3 flex flex-col">
          <form onSubmit={handleAddNotes}>
            <div>
              <input
                id="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Type Your Notes Title"
                className="bg-[#F7F7F7] p-3 w-full max-w-175 text-[20px] "
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
                className="bg-[#F7F7F7] p-3 w-full max-w-175 text-[20px] mt-3"
                required
              ></textarea>
            </div>
            <div className="flex justify-between">
              {!isEditMode && (
                <button
                  type="submit"
                  className="bg-[#437993] p-3 rounded-lg hover:cursor-pointer mt-3 text-white"
                >
                  Add Note
                </button>
              )}
              {isEditMode && (
                <button
                  type="button"
                  onClick={updateNote}
                  className="bg-[#437993] p-3 rounded-lg hover:cursor-pointer mt-3 text-white"
                >
                  Update Note
                </button>
              )}
              {isEditMode && (
                <button
                  type="button"
                  onClick={deleteNote}
                  className="bg-[#437993] p-3 rounded-lg hover:cursor-pointer mt-3 text-white "
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
