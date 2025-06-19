import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ExtraCalender = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  return (
    <div className="w-full flex flex-col items-center md:py-10 p-5">
      <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
        See Date and Select for Event
      </h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="border rounded-lg shadow-lg p-2 w-full mt-5"
      />
      <p className="text-lg mt-4 cursor-pointer">
        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-place="bottom"
          data-tooltip-content={"Working on it for Event Feature"}
        >
          Selected Date: <strong>{selectedDate.toDateString()}</strong>
        </a>
      </p>
    </div>
  );
};

export default ExtraCalender;
