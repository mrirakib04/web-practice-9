import { useContext } from "react";
import { UserMainContext } from "../../Context/UserContext";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import MyPendingRequests from "./EmployeeHomeComponents/MyPendingRequests";
import MyMonthlyRequests from "./EmployeeHomeComponents/MyMonthlyRequests";
import ExtraCalender from "./EmployeeHomeComponents/ExtraCalender";

const EmployeeHome = () => {
  const { user, name } = useContext(UserMainContext);
  const AxiosSecure = useAxiosPrivate();

  const { data: employee = [] } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/employee/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full py-10 text-center bg-gradient-to-r from-purple-100 via-white to-purple-100">
        <h3 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Welcome, <span className="italic font-bold">{name}</span>!
        </h3>
        <p className="sm:text-xl font-medium text-orange-600 mt-2">
          Let&apos;s get back to work.
        </p>
      </div>

      {!employee && (
        <p className="sm:text-2xl text-xl font-semibold text-orange-500">
          Contact with your HR.
        </p>
      )}
      <MyPendingRequests></MyPendingRequests>
      <MyMonthlyRequests></MyMonthlyRequests>
      <ExtraCalender></ExtraCalender>
    </div>
  );
};

export default EmployeeHome;
