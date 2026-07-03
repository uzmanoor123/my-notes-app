import { Link } from "react-router-dom";
const NotesNavbar = () => {
    return ( 
     <nav className="text-[18px] bg-[#F7F7F7] py-4 text-black mb-4 w-screen ">
        <div className="mx-auto max-w-[700px]">
           <Link to="/">Home</Link>
            </div>
    </nav>
     );
}
 
export default NotesNavbar;