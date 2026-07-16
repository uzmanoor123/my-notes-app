import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const Navbar = ({ isHome = false, setSearch, setSortBy }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <nav className="text-[18px] bg-[#F7F7F7] px-10 py-4 text-black mb-4 flex items-center justify-center gap-8 relative">
      {isHome ? (
        <>
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
        </>
      ) : (
        <div className="mx-auto max-w-[675px] w-full p-2">
          <Link to="/">Home</Link>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="bg-[#437993] hover:bg-[#35657a] text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-300 flex items-center cursor-pointer gap-3 fixed top-28 right-15"
      >
        <FaSignOutAlt />
        SignOut
      </button>
    </nav>
  );
};

export default Navbar;
