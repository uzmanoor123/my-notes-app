import { useNavigate } from "react-router-dom";
const NoteItem = ({ id, title, description, date }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => {
                navigate(`/notes/${id}`);
               console.log(id)
            }}
            className="bg-[#F7F7F7] p-4 rounded cursor-pointer"
        >
            <div className="titleCard">{title} </div>
            <div className="descriptionCard"> {description} </div>
            <div> {date}</div>
        </div>
    );
};

export default NoteItem;
