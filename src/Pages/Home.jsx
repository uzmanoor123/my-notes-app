import HomeNavbar from "../Components/HomeNavbar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import NoteItem from "../Components/NoteItem";
import { useEffect, useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    // get notes
    const result = await fetch(`http://localhost:3000/api/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await result.json();
    console.log(response);
    setNotes(response);
  };

  useEffect(() => {
    getNotes();
  }, []);

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
      return b.updatedAt - a.updatedAt;
    } else if (sortBy == "created") {
      return b.createdAt - a.createdAt;
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
            key={note.id}
            id={note.id}
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
