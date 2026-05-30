import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Existing image imports preserved
import hrImg from "./../../assets/hr1.png";
import employeeImg from "./../../assets/employee1.jpg";

const HomeBanner = () => {
  return (
    <div className="w-full relative group bg-[#0F0F12]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        watchSlidesProgress={true}
        speed={1000}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        onProgress={(swiper) => {
          // This loop calculates custom transition states per slide dynamically
          // generating a high-end web-creative/SaaS parallax depth effect
          for (let i = 0; i < swiper.slides.length; i++) {
            const slide = swiper.slides[i];
            const progress = slide.progress;
            const img = slide.querySelector(".parallax-bg");
            const content = slide.querySelector(".content-animate");

            if (img) {
              // Smoothly scale down and translate images across screen widths
              const scale = 1 + Math.abs(progress) * 0.15;
              const translate = progress * swiper.width * 0.4;
              img.style.transform = `translate3d(${translate}px, 0, 0) scale(${scale})`;
            }
            if (content) {
              // Elevate text and CTAs by introducing varied timing offsets
              const contentTranslate = progress * swiper.width * 0.2;
              const opacity = 1 - Math.abs(progress) * 1.5;
              content.style.transform = `translate3d(${contentTranslate}px, 0, 0)`;
              content.style.opacity = opacity;
            }
          }
        }}
        onSetTransition={(swiper, speed) => {
          // Applies smooth timing functions to variables on state adjustments
          for (let i = 0; i < swiper.slides.length; i++) {
            const slide = swiper.slides[i];
            const img = slide.querySelector(".parallax-bg");
            const content = slide.querySelector(".content-animate");
            const transitionStyle = `${speed}ms cubic-bezier(0.25, 1, 0.5, 1)`;

            if (img) img.style.transition = transitionStyle;
            if (content) content.style.transition = transitionStyle;
          }
        }}
        className="w-full h-[320px] sm:h-[420px] md:h-[520px] lg:h-[580px]"
      >
        {/* Slide 1: Employee */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src={employeeImg}
              alt="employee-bg"
              className="parallax-bg w-full h-full object-cover object-center opacity-100"
            />
            {/* SaaS Dark UI Mask: Dark overlay creating strong contrast for crisp interactive components */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/30 to-[#0F0F12]/10 z-10" />
          </div>

          <div className="content-animate absolute inset-x-0 bottom-16 sm:bottom-20 md:bottom-24 z-20 flex flex-col items-center px-4 text-center">
            <Link
              className="w-full max-w-[280px] sm:w-auto text-base sm:text-lg font-bold py-3.5 px-10 text-purple-300 bg-[#16161A]/80 backdrop-blur-md border border-purple-500/20 hover:border-purple-500/60 hover:text-white hover:bg-purple-600/90 rounded-2xl shadow-xl shadow-purple-950/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] text-nowrap tracking-wide"
              to={"/JoinAsEmployee"}
            >
              Join As Employee
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 2: HR */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src={hrImg}
              alt="hr-bg"
              className="parallax-bg w-full h-full object-cover object-center opacity-100"
            />
            {/* SaaS Dark UI Mask: Dark overlay creating strong contrast for crisp interactive components */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/30 to-[#0F0F12]/10 z-10" />
          </div>

          <div className="content-animate absolute inset-x-0 bottom-16 sm:bottom-20 md:bottom-24 z-20 flex flex-col items-center px-4 text-center">
            <Link
              className="w-full max-w-[280px] sm:w-auto text-base sm:text-lg font-bold py-3.5 px-10 text-purple-300 bg-[#16161A]/80 backdrop-blur-md border border-purple-500/20 hover:border-purple-500/60 hover:text-white hover:bg-purple-600/90 rounded-2xl shadow-xl shadow-purple-950/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] text-nowrap tracking-wide"
              to={"/JoinAsHR"}
            >
              Join As HR
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Global overrides for Swiper Control Interfaces */}
      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: #a855f7 !important;
          background: rgba(22, 22, 26, 0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(168, 85, 247, 0.15);
          width: 48px !important;
          height: 48px !important;
          border-radius: 14px;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 15px !important;
          font-weight: 800;
        }
        .swiper-button-prev {
          left: 24px !important;
        }
        .swiper-button-next {
          right: 24px !important;
        }
        .group:hover .swiper-button-next, .group:hover .swiper-button-prev {
          opacity: 1;
          transform: scale(1);
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: #6b21a8;
          color: #ffffff !important;
          border-color: #c084fc;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.35);
        }
        .swiper-pagination-bullets.swiper-pagination-inverse, .swiper-pagination-custom, .swiper-pagination-fraction {
          bottom: 24px !important;
        }
        .swiper-pagination-bullet-active {
          background: #a855f7 !important;
          width: 28px !important;
          border-radius: 6px !important;
        }
        .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.25;
          width: 7px;
          height: 7px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet:hover {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default HomeBanner;
