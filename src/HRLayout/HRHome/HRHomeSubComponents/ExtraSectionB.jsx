const ExtraSectionB = () => {
  return (
    <div className="w-full flex flex-col items-center p-8  mt-5 sm:mt-10">
      <div className="text-center mb-8">
        <h2 className="sm:text-3xl text-2xl font-semibold">
          HR3 Managements Features
        </h2>
      </div>

      <div className="relative grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col items-center">
          <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
            📂
          </div>
          <p className="text-center mt-2 text-gray-700 font-semibold">
            Centralized Database
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
            🕒
          </div>
          <p className="text-center mt-2 text-gray-700 font-semibold">
            24/7 Service
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-violet-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
            💰
          </div>
          <p className="text-center mt-2 text-gray-700 font-semibold">
            Secured Payment
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-cyan-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
            🤝
          </div>
          <p className="text-center mt-2 text-gray-700 font-semibold">
            Recruitment
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
            🔒
          </div>
          <p className="text-center mt-2 text-gray-700 font-semibold">
            Data Security
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-teal-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
            📊
          </div>
          <p className="text-center mt-2 text-gray-700 font-semibold">
            Analysis Chart
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
            🎯
          </div>
          <p className="text-center mt-2 text-gray-700 font-semibold">
            Easy Management
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-lime-500 w-12 h-12 rounded-full flex items-center justify-center text-white">
            🌐
          </div>
          <p className="text-center mt-2 text-gray-700 font-semibold">
            Global Standard
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtraSectionB;
