import {  useNavigate } from "react-router-dom";

const HomeNavbar = ({setSearch,setSortBy}) => {
   const navigate = useNavigate();
      const handleLogout = (e)=>{
        e.preventDefault()
        localStorage.removeItem("token")
        navigate("/login")
    }
   
  return (

    <nav className="text-[18px] bg-[#F7F7F7] py-4 text-black mb-4  flex  justify-center gap-8 relative">
      <div className="justify-center">
        <input
          type="text"
          placeholder="Filter by"
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white p-2"
          id="inputSearch"
        />
      </div>
      <div className="justify-center">
        <select
          id="sorting"
          name="sortBy"
          className="bg-white p-2"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="alphabets">Alphabets</option>
          <option value="edited">Last Edited</option>
          <option value="created">Recently Created</option>
        </select>
      </div>
      <div className="flex">
      <button onClick={handleLogout} className="bg-[#437993]  p-2.5 rounded-lg hover:cursor-pointer  text-white fixed right-10 ">LogoutOut</button>
      </div> 
    </nav>
    
  );
};

export default HomeNavbar;
