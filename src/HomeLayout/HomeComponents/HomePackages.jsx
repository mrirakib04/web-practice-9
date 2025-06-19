import {
  FcAcceptDatabase,
  FcAddDatabase,
  FcBullish,
  FcBusinessman,
  FcClock,
  FcMoneyTransfer,
  FcPrivacy,
  FcTodoList,
} from "react-icons/fc";

const HomePackages = () => {
  return (
    <div className="py-10 px-5 w-full">
      <h2 className="text-center md:text-5xl sm:text-4xl text-3xl">
        Explore Packages
      </h2>
      <div className="mt-10 mx-auto w-full max-w-6xl grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-center items-center">
        <div className="w-full max-w-xs mx-auto flex flex-col gap-2 items-center border-2 border-teal-400 shadow-teal-200 text-nowrap shadow-lg rounded-lg py-3 px-2">
          <h3 className="sm:text-3xl text-2xl font-medium text-teal-600">
            Starter
          </h3>
          <span className="sm:text-2xl text-xl flex items-center gap-2 mt-2">
            <FcMoneyTransfer className="text-3xl"></FcMoneyTransfer>
            5$
          </span>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcBusinessman className="text-2xl"></FcBusinessman> 5 Employees
          </p>
          <p className="text-lg font-medium flex items-center gap-2 mt-5">
            <FcBullish className="text-2xl"></FcBullish>Uses Chart View
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcAddDatabase className="text-2xl"></FcAddDatabase>24/7 Add Assets
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcAcceptDatabase className="text-2xl"></FcAcceptDatabase>Unlimited
            Storage
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcPrivacy className="text-2xl"></FcPrivacy>Secured Management
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcTodoList className="text-2xl"></FcTodoList>
            Registered Employees
          </p>
          <p className="mt-3 text-lg font-medium flex items-center gap-2">
            <FcClock className="text-2xl"></FcClock>24/7 Helpline Support
          </p>
        </div>
        <div className="w-full max-w-xs mx-auto flex flex-col gap-2 items-center border-2 border-orange-500 shadow-orange-300 text-nowrap shadow-lg rounded-lg py-3 px-2">
          <h3 className="sm:text-3xl text-2xl font-semibold italic text-orange-700">
            Standard
          </h3>
          <span className="sm:text-2xl text-xl flex items-center gap-2 mt-2">
            <FcMoneyTransfer className="text-3xl"></FcMoneyTransfer>
            10$
          </span>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcBusinessman className="text-2xl"></FcBusinessman> 10 Employees
          </p>
          <p className="text-lg font-medium flex items-center gap-2 mt-5">
            <FcBullish className="text-2xl"></FcBullish>Uses Chart View
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcAddDatabase className="text-2xl"></FcAddDatabase>24/7 Add Assets
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcAcceptDatabase className="text-2xl"></FcAcceptDatabase>Unlimited
            Storage
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcPrivacy className="text-2xl"></FcPrivacy>Secured Management
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcTodoList className="text-2xl"></FcTodoList>
            Registered Employees
          </p>
          <p className="mt-3 text-lg font-medium flex items-center gap-2">
            <FcClock className="text-2xl"></FcClock>24/7 Helpline Support
          </p>
        </div>
        <div className="w-full max-w-xs mx-auto flex flex-col gap-2 items-center border-2 border-purple-600 shadow-purple-400 text-nowrap shadow-lg rounded-lg py-3 px-2">
          <h3 className="sm:text-3xl text-2xl font-bold text-purple-800">
            Premium
          </h3>
          <span className="sm:text-2xl text-xl flex items-center gap-2 mt-2">
            <FcMoneyTransfer className="text-3xl"></FcMoneyTransfer>
            15$
          </span>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcBusinessman className="text-2xl"></FcBusinessman> 15 Employees
          </p>
          <p className="text-lg font-medium flex items-center gap-2 mt-5">
            <FcBullish className="text-2xl"></FcBullish>Uses Chart View
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcAddDatabase className="text-2xl"></FcAddDatabase>24/7 Add Assets
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcAcceptDatabase className="text-2xl"></FcAcceptDatabase>Unlimited
            Storage
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcPrivacy className="text-2xl"></FcPrivacy>Secured Management
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            <FcTodoList className="text-2xl"></FcTodoList>
            Registered Employees
          </p>
          <p className="mt-3 text-lg font-medium flex items-center gap-2">
            <FcClock className="text-2xl"></FcClock>24/7 Helpline Support
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePackages;
