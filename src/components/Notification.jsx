import React from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import NotificationItem from "./NotificationItem";

const Notification = ({ notificationData }) => {
  return (
    <div className="my-4 space-y-4">
      <h1 className="text-xl font-semibold">Notification</h1>

      {notificationData.map((data, index) => (
        <div key={index}>
          <NotificationItem type={data.type} time={data.time} temperature={data.temperature}/>
        </div>
      ))}
    </div>
  );
};

export default Notification;
