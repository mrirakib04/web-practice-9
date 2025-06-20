import { useContext } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { UserMainContext } from "../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { MdReportGmailerrorred } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const HREmployeeList = () => {
  const AxiosSecure = useAxiosPrivate();
  const { user } = useContext(UserMainContext);

  const { data: team = [], refetch } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/team/${user.email}`);
      return res.data;
    },
  });

  const handleRemove = async (member) => {
    const { hiredBy, ...withoutHREmail } = member;
    console.log(member, hiredBy, withoutHREmail);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove him!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AxiosSecure.post("/unemployed", withoutHREmail);
        await AxiosSecure.delete(`/assigned/${member.email}`);
        await AxiosSecure.delete(`/team/${member.email}`);
        refetch();
        Swal.fire({
          title: "Removed!",
          text: "Your employee has been removed.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 sm:mt-10 mt-5">
      <Helmet>
        <title>Employees | HR | HR3 Managements</title>
      </Helmet>
      <div className="flex flex-col items-center">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Your Employees
        </h2>
        <p className="sm:text-lg font-medium text-cyan-700 mt-1">
          Explore detailed information about your employees.
        </p>
      </div>
      {team.length < 0 ? (
        <p className="text-lg font-medium text-red-800 flex gap-1 items-center">
          You have no employees here.
          <MdReportGmailerrorred className="text-2xl"></MdReportGmailerrorred>
        </p>
      ) : (
        <div className="lg:w-11/12 w-full container mx-auto px-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-2">
          {team.map((member) => (
            <div
              data-aos="zoom-in"
              key={member._id}
              className="max-w-[300px] p-5 border-2 border-t-cyan-200 shadow-md hover:shadow-xl duration-200 border-cyan-300 rounded-b-xl w-full flex flex-col mx-auto object-cover shadow-gray-300 bg-gradient-to-b from-cyan-300 via-white to-white"
            >
              <img
                src={member.image}
                className="h-40 w-40 rounded-full mx-auto object-cover shadow-lg shadow-gray-300 border-b-2 border-b-gray-400"
                alt={member.name}
              />
              <h3 className="text-2xl font-bold flex gap-1 mt-2">
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={member.name}
                  data-tooltip-place="top"
                  className="block truncate mx-auto"
                >
                  {member.name}
                </span>
              </h3>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={member.email}
                data-tooltip-place="bottom"
                className="text-lg font-medium flex gap-1 mt-2"
              >
                <span className="text-gray-600">Email: </span>
                <span className="block truncate max-w-none">
                  {member.email}
                </span>
              </p>
              <p className="text-lg font-medium text-black flex gap-1">
                <span className="text-gray-600">Role:</span>
                {member.role}
              </p>
              <button
                onClick={() => handleRemove(member)}
                className="mt-4 flex items-center gap-2 text-lg font-medium py-1 px-4 mx-auto rounded-lg border-2 border-red-800 duration-200 hover:bg-red-700 hover:text-white"
              >
                Remove <FaTrashAlt className="text-xl"></FaTrashAlt>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HREmployeeList;
