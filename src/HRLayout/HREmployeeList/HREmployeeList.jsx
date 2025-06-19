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
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
          Your Employees List
        </h2>
        <p className="sm:text-lg font-medium text-cyan-600 mt-2">
          View your employees details.
        </p>
      </div>
      {team.length < 0 ? (
        <p className="text-lg font-medium text-red-800 flex gap-1 items-center">
          You have no employees here.
          <MdReportGmailerrorred className="text-2xl"></MdReportGmailerrorred>
        </p>
      ) : (
        <div className="w-full container mx-auto px-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {team.map((member) => (
            <div
              key={member._id}
              className="max-w-[300px] p-5 border-2 shadow-lg shadow-purple-300 border-purple-800 rounded-xl w-full flex flex-col gap-2 mx-auto object-cover"
            >
              <img
                src={member.image}
                className="h-40 w-40 rounded-full mx-auto object-cover shadow-lg shadow-gray-300 border-b-2 border-b-gray-400"
                alt={member.name}
              />
              <h3
                data-tooltip-id="my-tooltip"
                data-tooltip-content={member.name}
                data-tooltip-place="bottom"
                className="text-xl font-medium flex gap-1"
              >
                <span className="font-bold">Name: </span>
                <span className="block truncate max-w-none">{member.name}</span>
              </h3>
              <p
                data-tooltip-id="my-tooltip"
                data-tooltip-content={member.email}
                data-tooltip-place="bottom"
                className="text-xl font-medium flex gap-1"
              >
                <span className="font-bold">Email: </span>
                <span className="block truncate max-w-none">
                  {member.email}
                </span>
              </p>
              <p className="text-xl font-medium">
                <span className="font-bold">Role: </span>
                {member.role}
              </p>
              <button
                onClick={() => handleRemove(member)}
                className="mt-2 flex items-center gap-2 text-lg font-medium py-1 px-4 mx-auto rounded-lg border-2 border-red-800 transition hover:bg-red-700 hover:text-white"
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
