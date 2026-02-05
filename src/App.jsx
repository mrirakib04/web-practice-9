import { Outlet } from "react-router";
import Navbar from "./SharedComponents/Navbar";
import Footer from "./SharedComponents/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const App = () => {
  // Initialize AOS once when the component mounts
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="min-h-screen max-w-[1480px] mx-auto overflow-hidden bg-[#0F0F12] text-slate-200 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
      <Navbar />
      <div className="py-7"></div>
      <Outlet />

      <Footer />
    </div>
  );
};

export default App;
