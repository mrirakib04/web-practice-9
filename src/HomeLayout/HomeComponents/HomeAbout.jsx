import aboutImg from "./../../assets/assets-manage.jpg";

const HomeAbout = () => {
  return (
    <div className="md:grid md:grid-cols-2 items-center flex flex-wrap-reverse gap-12 md:gap-20 md:px-8 px-4 md:py-28 sm:py-20 py-14 bg-[#0F0F12]">
      {/* Left Column: Text Content */}
      <div className="flex flex-col md:items-start items-center gap-5 md:text-left text-center max-w-xl mx-auto md:mx-0">
        <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white flex items-baseline gap-2">
          Our Mission
          <span className="text-lg md:text-2xl font-semibold text-purple-400 normal-case italic">
            is
          </span>
        </h3>

        <p className="text-base md:text-lg text-slate-400 leading-relaxed tracking-wide">
          <span className="text-lg md:text-xl text-purple-400 font-extrabold uppercase tracking-wider mr-1">
            To
          </span>{" "}
          provide a seamless assets management system for{" "}
          <span className="text-white font-semibold underline decoration-purple-500/50 decoration-2 underline-offset-4">
            Human Resource Teams.
          </span>{" "}
          With our solution, HR teams can seamlessly track and manage resources
          in real time, improving transparency, reducing errors, and enabling
          data-driven decisions for better workforce management.
        </p>
      </div>

      {/* Right Column: Stylish Landscape Placement & Mask Effects */}
      <div className="w-full max-w-xl mx-auto flex justify-center items-center perspective-1000">
        <div className="relative group w-full aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#16161A] shadow-2xl transition-all duration-500 transform md:rotate-y-6 md:hover:rotate-y-0 md:hover:scale-[1.02] shadow-purple-500/[0.03] hover:shadow-purple-500/10">
          {/* Angular Gradient Mask Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 z-10 pointer-events-none" />

          {/* Futuristic Soft Border Accent Highlight */}
          <div className="absolute inset-0 ring-1 ring-inset ring-purple-400/20 group-hover:ring-purple-400/50 transition-all duration-500 z-20 pointer-events-none" />

          <img
            className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out filter brightness-[0.85] group-hover:brightness-100"
            src={aboutImg}
            alt="banner-about"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
