import HomeNavbar from "../Components/HomeNavbar";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import NoteItem from "../Components/NoteItem";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config/envConfig";

const Home = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getNotes = async () => {
    // get notes
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
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
    }

    setNotes(response);
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
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
      <HomeNavbar setSearch={setSearch} setSortBy={setSortBy} />
      <div
        className="ContainerDivs py-4 max-w-200  gap-3 flex flex-col mx-auto"
        id="notesContainer"
      >
        {sortedNotes.map((note) => (
          <NoteItem
            key={note._id}
            id={note._id}
            title={note.title}
            description={note.description}
            date={new Date(note.updatedAt ?? note.createdAt).toLocaleString()}
          />
        ))}
      </div>
      <Link
        to="/notes"
        className="bg-[#437993] p-5 rounded-lg hover:cursor-pointer text-white fixed bottom-5 right-5"
      >
        Create New Note
      </Link>
    </>
  );
};

export default Home;
