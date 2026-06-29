const HomeNavbar = ({setSearch,setSortBy}) => {
  
  return (
    <nav className="text-[18px] bg-[#F7F7F7] py-4 text-black mb-4  flex justify-center gap-8">
      <div>
        <input
          type="text"
          placeholder="Filter by"
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white p-2"
          id="inputSearch"
        />
      </div>
      <div>
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
    </nav>
  );
};

export default HomeNavbar;
