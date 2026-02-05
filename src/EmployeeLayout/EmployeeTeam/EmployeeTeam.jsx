import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useContext } from "react";
import { UserMainContext } from "../../Context/UserContext";
import { MdReportGmailerrorred } from "react-icons/md";
import { DNA } from "react-loader-spinner";

const EmployeeTeam = () => {
  const { user } = useContext(UserMainContext);
  const AxiosSecure = useAxiosPrivate();

  const { data: company = {} } = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/team/member/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: team = [], isLoading } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/team/${company?.hiredBy}`);
      return res.data;
    },
    enabled: !!company?.hiredBy,
  });

  console.log(team);

  return (
    <div className="w-full flex flex-col items-center gap-5 sm:mt-10 mt-5">
      <div className="flex flex-col items-center">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Your Team
        </h2>
        <p className="sm:text-lg font-medium text-blue-600 mt-2">
          View your team members.
        </p>
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <DNA></DNA>
          </div>
        ) : team.length > 0 ? (
          <div className="w-full mt-5 container mx-auto px-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {team.map((member) => (
              <div
                data-aos="zoom-in-up"
                key={member._id}
                className="max-w-[300px] p-5 border-2 shadow-lg rounded-tl-none bg-gradient-to-b from-blue-600 via-white to-white shadow-gray-300 border-blue-600 rounded-xl w-full flex flex-col gap-2 mx-auto object-cover"
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
                  className="text-2xl font-semibold text-center"
                >
                  <span className="block truncate max-w-none text-blue-900">
                    {member.name}
                  </span>
                </h3>
                <p className="text-xl font-medium">
                  <span className="font-bold">Role: </span>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-5 text-lg font-medium text-red-800 flex gap-1 items-center">
            You have no team members.
            <MdReportGmailerrorred className="text-2xl"></MdReportGmailerrorred>
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeeTeam;
