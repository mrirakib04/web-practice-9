import { useContext } from "react";
import { UserMainContext } from "../../Context/UserContext";
import PendingRequests from "./HRHomeSubComponents/PendingRequests";
import TopRequestedItems from "./HRHomeSubComponents/TopRequestedItems";
import LimitedStockItems from "./HRHomeSubComponents/LimitedStockItems";
import RequestsPieChart from "./HRHomeSubComponents/RequestsPieChart";
import ExtraSectionA from "./HRHomeSubComponents/ExtraSectionA";
import ExtraSectionB from "./HRHomeSubComponents/ExtraSectionB";

const HRHome = () => {
  const { name } = useContext(UserMainContext);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full py-10 text-center bg-gradient-to-r from-cyan-100 via-white to-cyan-100">
        <h3 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Welcome, <span className="italic font-bold">{name}</span>!
        </h3>
        <p className="sm:text-xl font-medium text-orange-600 mt-2">
          Let&apos;s start using HR3 Managements.
        </p>
      </div>
      <PendingRequests></PendingRequests>
      <TopRequestedItems></TopRequestedItems>
      <LimitedStockItems></LimitedStockItems>
      <RequestsPieChart></RequestsPieChart>
      <ExtraSectionA></ExtraSectionA>
      <ExtraSectionB></ExtraSectionB>
    </div>
  );
};

export default HRHome;
