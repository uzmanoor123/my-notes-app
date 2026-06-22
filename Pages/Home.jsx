import HomeNavbar from "../Components/HomeNavbar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <Header />
      <HomeNavbar />
      <Link to="/notes"
        className="bg-[#437993] p-5 rounded-[8px] hover:cursor-pointer text-white fixed bottom-5 right-5"  >
        Create New Note
      </Link>
    </>
  );
};

export default Home;
