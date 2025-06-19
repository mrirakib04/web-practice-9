import { FaEnvelope, FaFacebook, FaPhone, FaYoutube } from "react-icons/fa";
import {
  FaLocationCrosshairs,
  FaSquareInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full mt-10 py-10 px-3 bg-black">
      <div className="mx-auto container flex gap-5 justify-between flex-wrap">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-white">Connect With Us</h3>
          <ul className="flex flex-col gap-1 font-medium text-gray-400 text-lg">
            <a
              className="py-2 px-3 flex items-center gap-1 text-3xl w-fit rounded-full transition hover:bg-white hover:text-blue-600"
              href="https://www.facebook.com/"
              target="_blank"
            >
              <FaFacebook></FaFacebook>
              <p className="text-black text-lg">Facebook</p>
            </a>
            <a
              className="py-2 px-3 flex items-center gap-1 text-3xl w-fit rounded-full transition hover:bg-white hover:text-pink-600"
              href="https://www.instagram.com/"
              target="_blank"
            >
              <FaSquareInstagram></FaSquareInstagram>
              <p className="text-black text-lg">Instagram</p>
            </a>
            <a
              className="py-2 px-3 flex items-center gap-1 text-3xl w-fit rounded-full transition hover:bg-white hover:text-black"
              href="https://x.com/"
              target="_blank"
            >
              <FaXTwitter></FaXTwitter>
              <p className="text-black text-lg">Twitter/X</p>
            </a>
            <a
              className="py-2 px-3 flex items-center gap-1 text-3xl w-fit rounded-full transition hover:bg-white hover:text-red-600"
              href="https://www.youtube.com/"
              target="_blank"
            >
              <FaYoutube></FaYoutube>
              <p className="text-black text-lg">YouTube</p>
            </a>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-white">Quick Address</h3>
          <ul className="flex flex-col gap-2 font-medium text-gray-400 text-lg">
            <p className="flex items-center gap-2">
              <FaPhone className="text-xl"></FaPhone>+88019 - - - - - - -
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope></FaEnvelope> support@example.com
            </p>
            <p className="flex items-center gap-2">
              <FaLocationCrosshairs className="text-xl"></FaLocationCrosshairs>{" "}
              Gazipur, Dhaka, Bangladesh
            </p>
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-72">
          <h3 className="text-2xl font-semibold text-white">About Us</h3>
          <p className=" font-medium text-gray-400 text-lg">
            We provide a seamless Assets Management for HR, allowing to add,
            manage, and share their assets to their employees effortlessly.
          </p>
        </div>
      </div>
      <div className="my-10 border border-gray-600"></div>
      <p className="text-center font-medium text-base text-white">
        &copy; 2024 HR3 Managements. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
