import { useContext, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import NavLogo from "./../../public/hr3-logo.jpg";
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

  // dynamic navbar control
  const { data: userForNav = [], error } = useQuery({
    queryKey: ["userForNav"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/user/${user?.email}`);
      if (error) {
        console.log(error);
      } else if (res) {
        console.log(res);
      }
      return res.data;
    },
    retry: 3,
    retryDelay: 2000,
  });
  console.log(userForNav?.role, user?.email);
  const dynamicMobileNavbar = (role) => {
    if (role === "hr") {
      return (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                : "border-2 border-transparent py-2 px-4 rounded-lg"
            }
            to="/hr/dashboard/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                : "border-2 border-transparent py-2 px-4 rounded-lg"
            }
            to="/hr/dashboard/assetsList"
          >
            Assets
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                : "border-2 border-transparent py-2 px-4 rounded-lg"
            }
            to="/hr/dashboard/addAsset"
          >
            Add-Asset
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                : "border-2 border-transparent py-2 px-4 rounded-lg"
            }
            to="/hr/dashboard/requests"
          >
            Requests
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                : "border-2 border-transparent py-2 px-4 rounded-lg"
            }
            to="/hr/dashboard/employeeList"
          >
            Employees
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                : "border-2 border-transparent py-2 px-4 rounded-lg"
            }
            to="/hr/dashboard/addEmployee"
          >
            Add-Employee
          </NavLink>
        </>
      );
    } else if (role === "employee") {
      return (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                : "border-2 border-transparent py-2 px-4 rounded-lg"
            }
            to="/employee/dashboard/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                : "border-2 border-transparent py-2 px-4 rounded-lg"
            }
            to="/employee/dashboard/assets"
          >
            Assets
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                : "border-2 border-transparent py-2 px-4 rounded-lg"
            }
            to="/employee/dashboard/request"
          >
            Request
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                : "border-2 border-transparent py-2 px-4 rounded-lg"
            }
            to="/employee/dashboard/team"
          >
            Team
          </NavLink>
        </>
      );
    }
  };
  const dynamicComputerNavbar = (role) => {
    if (role === "hr") {
      return (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                : "py-1 px-3 rounded-lg border-b-2 border-transparent"
            }
            to="/hr/dashboard/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                : "py-1 px-3 rounded-lg border-b-2 border-transparent"
            }
            to="/hr/dashboard/assetsList"
          >
            Assets
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                : "py-1 px-3 rounded-lg border-b-2 border-transparent"
            }
            to="/hr/dashboard/addAsset"
          >
            Add-Asset
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                : "py-1 px-3 rounded-lg border-b-2 border-transparent"
            }
            to="/hr/dashboard/requests"
          >
            Requests
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                : "py-1 px-3 rounded-lg border-b-2 border-transparent"
            }
            to="/hr/dashboard/employeeList"
          >
            Employees
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                : "py-1 px-3 rounded-lg border-b-2 border-transparent"
            }
            to="/hr/dashboard/addEmployee"
          >
            Add-Employee
          </NavLink>
        </>
      );
    } else if (role === "employee") {
      return (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                : "py-1 px-3 rounded-lg border-b-2 border-transparent"
            }
            to="/employee/dashboard/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                : "py-1 px-3 rounded-lg border-b-2 border-transparent"
            }
            to="/employee/dashboard/assets"
          >
            Assets
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                : "py-1 px-3 rounded-lg border-b-2 border-transparent"
            }
            to="/employee/dashboard/request"
          >
            Request
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                : "py-1 px-3 rounded-lg border-b-2 border-transparent"
            }
            to="/employee/dashboard/team"
          >
            Team
          </NavLink>
        </>
      );
    }
  };

  return (
    <div className="bg-white/80 w-full fixed z-50 shadow-lg max-w-[1480px]">
      <div className="text-black flex justify-between items-center py-4 md:px-6 sm:px-3 px-2 mx-auto">
        <div className="relative text-xl flex gap-3 font-bold items-center">
          <div className="flex">
            <button className="lg:hidden text-2xl" onClick={navShowHide}>
              <RiMenu2Fill />
            </button>
            {navShow && (
              <div className="absolute lg:hidden border-2 text-base rounded-lg top-14 font-bold bg-gray-100 text-gray-700 p-4">
                <ul className="flex flex-col gap-2 text-nowrap">
                  {user ? (
                    dynamicMobileNavbar(userForNav?.role)
                  ) : (
                    <>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                            : "border-2 border-transparent py-2 px-4 rounded-lg"
                        }
                        to="/"
                      >
                        Home
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                            : "border-2 border-transparent py-2 px-4 rounded-lg"
                        }
                        to="/JoinAsEmployee"
                      >
                        Join as Employee
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "border-cyan-400 text-cyan-600 border-2 py-2 px-4 rounded-lg"
                            : "border-2 border-transparent py-2 px-4 rounded-lg"
                        }
                        to="/JoinAsHR"
                      >
                        Join as HR
                      </NavLink>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
          <Link
            to="/"
            className="flex shadow-lg px-1 py-1 bg-white rounded-md border-t-4 border-l-4 border-black rounded-tl-none"
          >
            <img
              data-tooltip-id="my-tooltip"
              data-tooltip-content={company && company.companyName}
              data-tooltip-place="bottom"
              src={company.companyLogo || NavLogo}
              className="w-10 h-10 rounded-md object-cover"
              alt="HR3 logo"
            />
          </Link>
        </div>
        <div className="lg:flex font-bold text-base hidden">
          <ul className="flex gap-1">
            {user ? (
              dynamicComputerNavbar(userForNav.role)
            ) : (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                      : "py-1 px-3 rounded-lg border-b-2 border-transparent"
                  }
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                      : "py-1 px-3 rounded-lg border-b-2 border-transparent"
                  }
                  to="/JoinAsEmployee"
                >
                  Join as Employee
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-1 bg-cyan-200 shadow-lg px-3 rounded-lg border-b-2 border-white text-cyan-950"
                      : "py-1 px-3 rounded-lg border-b-2 border-transparent"
                  }
                  to="/JoinAsHR"
                >
                  Join as HR
                </NavLink>
              </>
            )}
          </ul>
        </div>

        <div className="flex items-center text-black">
          {user ? (
            <div className="relative flex gap-2 items-center">
              <a
                data-tooltip-id="my-tooltip"
                data-tooltip-content={user.displayName}
              >
                <button onClick={profileShowHide}>
                  <img
                    className="h-12 w-12 object-cover rounded-full border-2 border-black"
                    src={image || user.photoURL}
                    alt="User-Photo"
                  />
                </button>
              </a>
              {showProfile && (
                <div className="absolute top-16 right-2 flex flex-col gap-1 py-5 px-3 bg-gray-50 rounded-lg border-2">
                  <Link
                    to={"/profile"}
                    className="text-lg font-bold hover:text-black text-gray-700 duration-300"
                  >
                    <h2>{user.displayName}</h2>
                  </Link>
                  <p className="text-base text-gray-600 font-medium">
                    {user.email}
                  </p>

                  <div>
                    <button
                      onClick={handleLogout}
                      className="mt-3 text-xl text-left font-bold text-red-600 transition hover:text-red-800"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex gap-2 items-center px-3 p-1 bg-white rounded-full text-2xl border-2 border-cyan-500"
            >
              <p className="text-lg font-medium">Login</p>
              <FiLogIn></FiLogIn>
            </Link>
          )}
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default Navbar;
