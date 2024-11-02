import React from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";

const NotificationItem = ({ type, time, temperature }) => {
  const data = {
    message: type === "on" ? "Alat Pendingin Dihidupkan" : type === "off" && "Alat Pendingin Dimatikan",
    color: type === "on" ? "5BE12C" : type === "off" && "FFEB3B",
  };

  return (
    <div
      className={`border-[2px] border-black rounded-md px-2 py-2 bg-[#${data.color}]`}
    >
      <div className="flex items-center gap-4">
        <div>
          <MdOutlineNotificationsActive size={42} />
        </div>
        <div className="w-full">
          <p className="text-sm font-semibold">{data.message}</p>
          <p className="text-base font-bold">Suhu {temperature} Derajat</p>
          <p className="text-xs">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
