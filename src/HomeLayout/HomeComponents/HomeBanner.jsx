import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import hrImg from "./../../assets/hr1.png";
import employeeImg from "./../../assets/employee1.jpg";
import { Link } from "react-router";

const HomeBanner = () => {
  return (
    <div className="w-full">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
      >
        <div className="relative sm:max-h-[520px] sm:h-auto">
          <img src={employeeImg} alt="employee-bg" />
          <Link
            className="absolute sm:bottom-10 bottom-4 w-11/12 left-4 sm:left-1/2 sm:-translate-x-1/2 z-40 text-lg font-medium sm:py-2 py-1 sm:px-6 px-3 transition hover:bg-zinc-300 bg-white rounded-md mx-auto text-nowrap"
            to={"/JoinAsEmployee"}
          >
            Join As Employee
          </Link>
        </div>
        <div className="relative sm:max-h-[520px] sm:h-auto">
          <img src={hrImg} alt="hr-bg" />
          <Link
            className="absolute sm:bottom-10 bottom-4 w-11/12 left-4 sm:left-1/2 sm:-translate-x-1/2 z-40 text-lg font-medium sm:py-2 py-1 sm:px-6 px-3 transition hover:bg-zinc-300 bg-white rounded-md mx-auto text-nowrap"
            to={"/JoinAsHR"}
          >
            Join As HR
          </Link>
        </div>
      </Carousel>
    </div>
  );
};

export default HomeBanner;
