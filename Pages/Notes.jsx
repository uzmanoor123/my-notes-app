import NotesNavbar from "../Components/NotesNavbar";
import Header  from "../Components/Header";
const Notes = () => {
    return ( 
        <>
        <Header />
        <NotesNavbar />
            <div class="flex  flex-col gap-3 mx-auto max-w-[700px]">
        <main class="gap-3 flex flex-col">
            <form onsubmit="handleAddNote(event)">
            <div><input id="title" type="text" placeholder="Type Your Notes Title"
                    class="bg-[#F7F7F7] p-3 w-full max-w-[700px] text-[20px] " required/></div>
            <div><textarea id="description" type="text" placeholder="Type Yours Notes Body"
                    class="bg-[#F7F7F7] p-3 w-full max-w-[700px] text-[20px] mt-3" required></textarea></div>
                    <div class="flex justify-between">
            <button type="submit" id = "addBtn"
               class="bg-[#437993] p-3 rounded-[8px] hover:cursor-pointer mt-3 text-white">Add Notes</button>
            <button type="button" onclick="updateNote()" id = "updateBtn"
               class="bg-[#437993] p-3 rounded-[8px] hover:cursor-pointer mt-3 text-white hidden">Update Note</button>
                <button type="button" id = "deleteBtn" onclick="deleteNote()"
               class="bg-[#437993] p-3 rounded-[8px] hover:cursor-pointer mt-3 text-white hidden">Remove Note</button>
               </div>
                </form>
        </main>
    </div>
        
        </>
     );
}
 
export default Notes;