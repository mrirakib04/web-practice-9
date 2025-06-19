import aboutImg from "./../../assets/assets-manage.jpg";

const HomeAbout = () => {
  return (
    <div className="md:grid md:grid-cols-2 items-center flex flex-wrap-reverse gap-5 md:px-5 px-2 md:py-20 sm:py-14 py-10">
      <div className="flex flex-col md:items-start items-center gap-3 md:text-left text-center">
        <h3 className="md:text-5xl text-3xl font-semibold italic flex items-end gap-1">
          Our Mission
          <span className="md:text-3xl text-xl font-medium text-emerald-600">
            is
          </span>
        </h3>
        <p className="text-lg">
          <span className="text-xl text-sky-600 font-semibold">To</span> provide
          a seemless assets management system for
          <span className="text-teal-700 font-medium text-wrap">
            {" "}
            Human Resourse Team.
          </span>{" "}
          With our solution, HR teams can seamlessly track and manage resources
          in real time, improving transparency, reducing errors, and enabling
          data-driven decisions for better workforce management.
        </p>
      </div>
      <div className="flex">
        <img
          className="w-full rounded-full"
          src={aboutImg}
          alt="banner-about"
        />
      </div>
    </div>
  );
};

export default HomeAbout;
