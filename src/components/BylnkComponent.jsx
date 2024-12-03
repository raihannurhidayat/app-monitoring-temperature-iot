import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

const BylnkComponent = () => {
  const [temperatur, setTemperature] = useState("");

  const blynkToken = "p3UWtzBktRtC_Z64OWIYOEBXzV9JgCfv";

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://blynk.cloud/external/api/get?token=${blynkToken}&pin=V3`
      );
      const data = await response.json();
      setTemperature(data);
    } catch (error) {
      console.log("Something is wrong ", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <h1>BylnkComponent</h1>
      <p>Temperature {temperatur}</p>
    </div>
  );
};

export default BylnkComponent;
