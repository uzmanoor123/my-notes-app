const HomeNavbar = () => {
    return (
        <nav className="text-[18px] bg-[#F7F7F7] py-4 text-black mb-4  flex justify-center gap-8">
        <div>
            <input type="text" placeholder="Filter by" class="bg-white p-2" id="inputSearch" onInput="search()"/>
        </div>
        <div>
            <select id="sorting" name="sortBy" className="bg-white p-2" onchange="sortNotes()">
                <option value="">Sort By</option>
                <option value="alphabets" >Alphabets</option>
                <option value="edited">Last Edited</option>
                <option value="created">Recently Created</option>
            </select>
        </div>
    </nav>
     );
}
 
export default HomeNavbar;