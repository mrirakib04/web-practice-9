import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useContext } from "react";
import { UserMainContext } from "../../../Context/UserContext";
import { DNA } from "react-loader-spinner";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#448EE4", "#FFA500"];
const RADIAN = Math.PI / 180;
// ✅ Label renderer function
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const RequestsPieChart = () => {
  const AxiosSecure = useAxiosPrivate();
  const { user } = useContext(UserMainContext);

  const { data: chartData = [], isLoading: chartLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/hr/chart/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const transformedData = chartData?.map((item) => ({
    name: item.reqsType,
    value: item.quantity,
  }));

  console.log("chart data:", chartData);

  return (
    <div className="w-full mt-10 sm:mb-10 mb-5">
      <div className="w-full flex flex-col items-center p-2">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Pie Chart
        </h2>
        <p className="sm:text-lg font-medium text-emerald-600 mt-2 text-center">
          See the chart view of returnable and non-returnable requests.
        </p>
      </div>
      {chartLoading ? (
        <div className="w-full flex items-center justify-center">
          <DNA></DNA>
        </div>
      ) : chartData ? (
        <div className="w-full p-5 mx-auto">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart width={400} height={400}>
              <Pie
                data={transformedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {transformedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-xl text-center mt-5 text-orange-600 font-semibold">
          No requests here for chart.
        </p>
      )}
    </div>
  );
};

export default RequestsPieChart;
