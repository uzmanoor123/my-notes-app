const NoteItem = ({title, description, date}) => {
    return <div className="bg-[#F7F7F7] p-4 rounded">       
            <div className="titleCard">{title} </div>
            <div className="descriptionCard">  {description} </div>
            <div> {date}</div>
    </div>;
}
 
export default NoteItem;