import NotesNavbar from "../Components/NotesNavbar";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const Notes = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  useEffect(() => {
    if(id){
      fetch(`http://localhost:3000/api/notes/${id}`)
        .then(res=>res.json())
        .then(data=>{
          setTitle(data.title);
          setDescription(data.description)
        })
    }
}, [id]);

  const handleAddNotes = async (event) => {
    event.preventDefault();

    let note = {
      title: title,
      description: description,
      createdAt: Date.now(),
      updatedAt: null,
      id: crypto.randomUUID()
    };
    console.log(note);
    await fetch("http://localhost:3000/api/notes",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(note)
    })
    navigate("/");
  };

  const handleUpdatedNote =async () => {
    const updatedNote = {
      title: title,
      description: description,
    }
    await fetch(`http://localhost:3000/api/notes/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(updatedNote)  
    })  
    navigate("/");
  };
  const HandleDeleteNote = async () => {
      await fetch(`http://localhost:3000/api/notes/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(HandleDeleteNote)  
    })   
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
                  onClick={handleUpdatedNote}
                  className="bg-[#437993] p-3 rounded-lg hover:cursor-pointer mt-3 text-white"
                >
                  Update Note
                </button>
              )}
              {isEditMode && (
                <button
                  type="button"
                  onClick={HandleDeleteNote}
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
