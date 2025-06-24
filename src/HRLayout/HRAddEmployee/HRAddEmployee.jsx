import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { IoMdAddCircle } from "react-icons/io";
import { UserMainContext } from "../../Context/UserContext";
import Payment from "../../HomeLayout/PaymentPage/Payment";
import { Helmet } from "react-helmet-async";

const HRAddEmployee = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const { user } = useContext(UserMainContext);

  const AxiosSecure = useAxiosPrivate();

  const { data: company = [] } = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/hr/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(company);

  // Fetch unemployed users
  const { data: unemployedUsers = [], refetch } = useQuery({
    queryKey: ["unemployedUsers"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/unemployed");
      return res.data;
    },
  });

  const { data: hr = [], refetch: rerefetchHR } = useQuery({
    queryKey: ["hr"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/hr/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: team = [], refetch: refetchTeam } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/team/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log("----------", team.length, hr.packageName, "---------");

  const assignUser = async (employee) => {
    const { _id, ...cleanEmployee } = employee;
    const addInTeam = {
      ...cleanEmployee,
      hiredBy: user.email,
      companyLogo: company.companyLogo,
      companyName: company.companyName,
    };

    await AxiosSecure.post("/team", addInTeam);
    // Add the user to the "assigned" collection
    await AxiosSecure.post("/assigned", cleanEmployee);
    // Remove the user from the "unemployed" collection
    await AxiosSecure.delete(`/unemployed/${employee.email}`);
    refetch();
    refetchTeam();
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => {
        const name = info.getValue();
        return (
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content={name}
            className="block truncate sm:truncate sm:max-w-none max-w-[5rem] font-medium"
          >
            {name}
          </span>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => {
        const email = info.getValue();
        return (
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content={email}
            className="block truncate sm:max-w-none max-w-[4rem]"
          >
            {email}
          </span>
        );
      },
    },
    {
      accessorKey: "image",
      header: "Photo",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt={info.row.original.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content={
            hr.packageName <= parseInt(team.length)
              ? "Increase your limit"
              : "Add employee"
          }
          disabled={hr.packageName <= parseInt(team.length)}
          onClick={() => assignUser(info.row.original)}
          className={
            hr.packageName <= parseInt(team.length)
              ? "text-3xl text-gray-400 transition hover:text-gray-700"
              : "text-3xl text-green-400 transition hover:text-green-700"
          }
        >
          <IoMdAddCircle />
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: unemployedUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div className="sm:mt-10 mt-5 flex flex-col items-center justify-center gap-5 w-full">
      <Helmet>
        <title>Add Employee | HR | HR3 Managements</title>
      </Helmet>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
            Increas your Limit
          </h2>
          <p className="sm:text-lg font-medium text-orange-600 mt-2">
            5$ will be charged for per 10/member Increasment
          </p>
        </div>
        <div className="w-full mb-5">
          <Payment rerefetchHR={rerefetchHR}></Payment>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Find and Add Employee
        </h2>
        <p className="sm:text-lg font-medium text-orange-600 mt-2">
          Find your employee and add in your team.
        </p>
      </div>
      <div className="lg:w-4/5 md:w-8/12 sm:w-10/12">
        {/* Table */}
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100 font-bold">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-2 py-2 text-left"
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-2 py-1"
                  >
                    {cell.column.columnDef.cell
                      ? cell.column.columnDef.cell(cell)
                      : cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination(() => ({
                pageIndex: 0,
                pageSize: Number(e.target.value),
              }))
            }
            className="ml-4 p-2 border border-gray-300 rounded"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default HRAddEmployee;
