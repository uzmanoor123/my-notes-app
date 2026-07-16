import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import NoteItem from "../Components/NoteItem";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config/envConfig";
import { useAuth } from "../hooks/useAuth";
import { FaPlus } from "react-icons/fa";
const Home = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [notes, setNotes] = useState([]);
  const { token, logout } = useAuth({ required: true });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getNotes = async () => {
    setIsLoading(true);
    const result = await fetch(`${BASE_URL}/api/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });

    const response = await result.json();
    if (!result.ok) {
      if (
        response.error === "invalid or expire token" ||
        response.error === "token is required"
      ) {
        logout();
        navigate("/login");
        return;
      }
    }

    setNotes(response);
    setIsLoading(false);
  };

  useEffect(() => {
    if (token) {
      getNotes();
    }
  }, [token]);


  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())
    );
  });
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy == "alphabets") {
      return a.title.localeCompare(b.title);
    } else if (sortBy == "edited") {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    } else if (sortBy == "created") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  return (
    <>
      <Header />
      <Navbar isHome setSearch={setSearch} setSortBy={setSortBy} />
      <div
        className="ContainerDivs py-4 max-w-200  gap-3 flex flex-col mx-auto"
        id="notesContainer"
      >
        {isLoading ? (
          // make it vertical center
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          sortedNotes.map((note) => (
          <NoteItem
            key={note._id}
            id={note._id}
            title={note.title}
            description={note.description}
            date={new Date(note.updatedAt ?? note.createdAt).toLocaleString()}
          />
          ))
        )}
      </div>
      <Link
        to="/notes"
        className="bg-[#437993] p-5 rounded-lg hover:cursor-pointer text-white fixed bottom-5 right-5"
      >
        <FaPlus className="text-white inline-block"/> Create New Note
      </Link>
    </>
  );
};

export default Home;
