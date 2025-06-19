import Swal from "sweetalert2";
import supportBanner from "./../../../assets/support.png";

const handleSubmit = (e) => {
  e.preventDefault();
  const text = e.target.message.value;
  if (text.length > 0) {
    e.target.reset();
    Swal.fire({
      title: "Thanks For Connecting Us!",
      text: "We will response you very soon.",
      icon: "info",
    });
  }
};
const ExtraSectionA = () => {
  return (
    <div className="max-w-6xl w-full mx-auto flex items-center sm:flex-nowrap flex-wrap sm:gap-5 gap-0 px-2 mt-5 sm:mt-10">
      <div className="w-full mx-auto">
        <img
          className="w-full max-w-lg mx-auto"
          src={supportBanner}
          alt="banner"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-between gap-5">
        <div className="flex flex-col items-center w-full">
          <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
            Contact Support
          </h2>
          <p className="sm:text-lg font-medium text-sky-600 mt-2">
            If you have any issue message Us.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            name="message"
            className="border-2 min-h-32 text-lg font-medium border-blue-600 rounded-lg py-2 px-3 w-full placeholder:text-lg placeholder:font-medium"
            placeholder="Message Us"
          ></textarea>
          <button className="w-full mx-auto py-2 font-semibold rounded-lg border-2 text-white shadow-gray-400 bg-gradient-to-tr from-green-600 to-blue-700 transition hover:shadow-lg">
            <p className="text-xl font-semibold py-1">Send Message</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExtraSectionA;
