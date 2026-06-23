import HomeNavbar from "../Components/HomeNavbar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import NoteItem from "../Components/NoteItem";
import { useEffect,useState } from "react";

const Home = () => {
  const [notes,setNotes] = useState([])
  useEffect(() => {
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
}, []); 
  return (
    <>
      <Header />
      <HomeNavbar />
      <div className="ContainerDivs py-4 max-w-[800px]  gap-3 flex flex-col mx-auto" id="notesContainer">
        {
          notes.map((note) => (
           
           <NoteItem  key = {note.id} title={note.title}  description={note.description} date={new Date (note.createdAt).toLocaleString() } />    
          )) }  
    </div>
      <Link to="/notes"
        className="bg-[#437993] p-5 rounded-[8px] hover:cursor-pointer text-white fixed bottom-5 right-5"  >
        Create New Note
      </Link>
    </>
  );
}



export default Home;
