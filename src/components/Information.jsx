import React from "react";
import { FaTemperatureArrowUp , FaTemperatureArrowDown } from "react-icons/fa6";

const Information = ({ highestTemperature, lowTemperature }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2 py-4  bg-gradient-to-tl from-[#F44336] to-[#F44336]/980 rounded-md border-[2px] border-black/50 shadow-sm">
        <div className="space-y-2">
          <p className="text-base tracking-tight">
            Highest <br /> Temperature
          </p>
          <p className="text-2xl font-bold">{highestTemperature} &deg;C</p>
        </div>
        <div>
          <FaTemperatureArrowUp  size={70} />
        </div>
      </div>

      {/* low temperature */}
      <div className="flex justify-between items-center px-2 py-4  bg-gradient-to-tr from-[#0055ff] to-[#F44336]/980 rounded-md border-[2px] border-black/50 shadow-sm">
        <div>
          <FaTemperatureArrowDown size={70} />
        </div>
        <div className="space-y-2">
          <p className="text-base tracking-tight">
            Lowest <br /> Temperature
          </p>
          <p className="text-2xl font-bold">{lowTemperature} &deg;C</p>
        </div>
      </div>
    </div>
  );
};

export default Information;
