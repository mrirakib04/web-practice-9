import { Outlet } from "react-router";
import Navbar from "./SharedComponents/Navbar";
import Footer from "./SharedComponents/Footer";

const App = () => {
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
