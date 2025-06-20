import { Outlet } from "react-router";
import Navbar from "./SharedComponents/Navbar";
import Footer from "./SharedComponents/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  AOS.init();

  return (
    <div className="max-w-[1480px] mx-auto flex flex-col items-center">
      <Navbar></Navbar>
      <div className="py-10"></div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default App;
