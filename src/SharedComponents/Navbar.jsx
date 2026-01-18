import { useContext, useState } from "react";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import NavLogo from "/hr3-logo.jpg";
import { Tooltip } from "react-tooltip";
import { UserMainContext } from "../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const Navbar = () => {
  const { user, image, handleLogout } = useContext(UserMainContext);
  const AxiosPublic = useAxiosPublic();
  const AxiosSecure = useAxiosPrivate();

  const [navShow, setNavShow] = useState(false);
  const navShowHide = () => setNavShow((prev) => !prev);

  const [showProfile, setShowProfile] = useState(false);
  const profileShowHide = () => setShowProfile((prev) => !prev);

  const { data: company = [] } = useQuery({
    queryKey: ["company"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosSecure.get(`/team/member/${user?.email}`);
      return res.data;
    },
  });

  const { data: userForNav = [] } = useQuery({
    queryKey: ["userForNav"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/user/${user?.email}`);
      return res.data;
    },
    retry: 3,
    retryDelay: 2000,
  });

  // Centralized Style Logic
  const mobileLinkStyle = ({ isActive }) =>
    `block py-3 px-5 rounded-xl transition-all font-semibold ${
      isActive
        ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40"
        : "text-slate-300 hover:bg-white/5"
    }`;

  const desktopLinkStyle = ({ isActive }) =>
    `relative py-2 px-4 transition-all duration-300 font-semibold ${
      isActive ? "text-purple-400" : "text-slate-300 hover:text-purple-400"
    }`;

  const navItems = {
    hr: [
      { label: "Home", path: "/hr/dashboard/home" },
      { label: "Assets", path: "/hr/dashboard/assetsList" },
      { label: "Add Asset", path: "/hr/dashboard/addAsset" },
      { label: "Requests", path: "/hr/dashboard/requests" },
      { label: "Employees", path: "/hr/dashboard/employeeList" },
      { label: "Add Employee", path: "/hr/dashboard/addEmployee" },
    ],
    employee: [
      { label: "Home", path: "/employee/dashboard/home" },
      { label: "Assets", path: "/employee/dashboard/assets" },
      { label: "Request", path: "/employee/dashboard/request" },
      { label: "Team", path: "/employee/dashboard/team" },
    ],
    guest: [
      { label: "Home", path: "/" },
      { label: "Join Employee", path: "/JoinAsEmployee" },
      { label: "Join HR", path: "/JoinAsHR" },
    ],
  };

  const currentRole = user ? userForNav?.role?.toLowerCase() : "guest";
  const links = navItems[currentRole] || navItems.guest;

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#0F0F12]/80 backdrop-blur-md border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-2">
        {/* Left: Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden text-2xl text-purple-500 hover:text-purple-400 transition-colors"
            onClick={navShowHide}
          >
            <RiMenu2Fill />
          </button>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-1 bg-purple-600 rounded-lg group-hover:scale-110 transition-transform">
              <img
                data-tooltip-id="my-tooltip"
                data-tooltip-content={company?.companyName || "HR3"}
                src={company.companyLogo || NavLogo}
                className="w-8 h-8 rounded-md object-cover bg-white"
                alt="Logo"
              />
            </div>
            {/* Custom Responsive Title Text Sizes */}
            <span className="text-2xl sm:text-3xl sm:flex hidden font-extrabold text-white tracking-tight">
              HR<span className="text-purple-500">3</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={desktopLinkStyle}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-purple-500 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right: User Profile / Login */}
        <div className="flex items-center">
          {user ? (
            <div className="relative">
              <button
                onClick={profileShowHide}
                className="flex items-center gap-2 p-1 rounded-full ring-2 ring-purple-500/30 hover:ring-purple-500 transition-all"
              >
                <img
                  className="h-10 w-10 object-cover rounded-full border-2 border-[#0F0F12]"
                  src={image || user.photoURL}
                  alt="User"
                />
              </button>

              {showProfile && (
                <div className="absolute top-14 right-0 w-64 bg-[#1A1A22] border border-white/10 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex flex-col items-center pb-4 border-b border-white/5">
                    <p className="text-white font-bold text-lg">
                      {user.displayName}
                    </p>
                    <p className="text-slate-400 text-sm truncate w-full text-center">
                      {user.email}
                    </p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 p-2 text-slate-300 hover:text-purple-400 hover:bg-white/5 rounded-lg transition-all"
                    >
                      <FiUser /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all font-semibold"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex gap-2 items-center px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all shadow-lg shadow-purple-900/20 active:scale-95"
            >
              Login <FiLogIn />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {navShow && (
        <div className="lg:hidden absolute top-20 left-4 right-4 bg-[#1A1A22] border border-white/10 rounded-2xl shadow-2xl p-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setNavShow(false)}
              className={mobileLinkStyle}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

      <Tooltip
        id="my-tooltip"
        style={{ backgroundColor: "#8B5CF6", borderRadius: "8px" }}
      />
    </nav>
  );
};

export default Navbar;
