import NotesNavbar from "../Components/NotesNavbar";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "./../config/envConfig";
const Notes = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (id) {
      const timer = setTimeout(() => {
        setLoading(true);
      }, 500);
      fetch(`${BASE_URL}/api/notes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          clearTimeout(timer);
          setLoading(false);
          setTitle(data.title);
          setDescription(data.description);
        });
    }
  }, [id]);

  const handleAddNotes = async (event) => {
    event.preventDefault();
    const timer = setTimeout(() => {
      setLoading(true);
    }, 500);
    const token = localStorage.getItem("token");
    let note = {
      title: title,
      description: description,
      createdAt: Date.now(),
      updatedAt: null,
    };
    console.log(note);
    await fetch(`${BASE_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(note),
    });
    setLoading(false);
    clearTimeout(timer);
    navigate("/");
  };

  const handleUpdatedNote = async () => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 500);
    const token = localStorage.getItem("token");
    const updatedNote = {
      title: title,
      description: description,
    };
    await fetch(`${BASE_URL}/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(updatedNote),
    });
    setLoading(false);
    clearTimeout(timer);
    navigate("/");
  };
  const HandleDeleteNote = async () => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 500);      
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    setLoading(false);
    clearTimeout(timer);
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
                  onClick={() => setShowModal(true)}
                  className="bg-[#437993] p-3 rounded-lg hover:cursor-pointer mt-3 text-white "
                >
                  Remove Note
                </button>
              )}
            </div>
          </form>
        </main>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold">Delete Note</h2>

            <p className="mt-3">Are you sure you want to delete this note?</p>
            <div className="flex justify-end gap-4 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-300 rounded" >
                No
              </button>
              <button  onClick={HandleDeleteNote} className="px-5 py-2 bg-red-500 text-white rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-bold">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
