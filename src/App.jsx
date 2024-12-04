import GaugeComponent from "./components/Gouge";
import LayoutAppRoot from "./layouts/layoutApp";
import Chart from "./components/Chart";
import { useEffect, useState } from "react";
import Information from "./components/Information";
import Notification from "./components/Notification";
import MqttComponent from "./components/MqttComponent";

export default function App() {
  const [value, setValue] = useState(0); // Diubah menjadi default 0
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [highestTemperature, setHighestTemperature] = useState(0);
  const [lowTemperature, setLowTemperature] = useState(0);
  const [notificationData, setNotificationData] = useState([]);
  const [isOn, setIsOn] = useState("mati");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTemperatureData = (temperature) => {
    setValue(temperature);

    const now = new Date();
    const seconds = now.getSeconds();

    const newData = {
      name: seconds.toString(),
      temperature,
    };

    if (temperature > 37 && isOn === "mati") {
      setIsOn("hidup");
      const data = { temperature, time: now.toLocaleTimeString(), type: "on" };
      setNotificationData((prev) => [data, ...prev]);
    }

    if (temperature < 28 && isOn === "hidup") {
      setIsOn("mati");
      const data = { temperature, time: now.toLocaleTimeString(), type: "off" };
      setNotificationData((prev) => [data, ...prev]);
    }

    setData((prevData) => {
      const updatedData =
        prevData.length > 9
          ? [...prevData.slice(1), newData]
          : [...prevData, newData];

      const currentHighest = Math.max(
        ...updatedData.map((item) => item.temperature)
      );

      const currentLow = Math.min(
        ...updatedData.map((item) => item.temperature)
      );

      setHighestTemperature(currentHighest);
      setLowTemperature(currentLow);

      return updatedData;
    });
  };

  return (
    <LayoutAppRoot>
      <h1 className="text-3xl text-center font-bold">Monitoring App</h1>
      <div className="my-3 mx-auto">
        <GaugeComponent value={value} />
      </div>
      <div className="pt-12 mx-auto">
        <h1 className="text-xl font-semibold my-4">Grafik Temperature</h1>
        <h2 className="text-lg my-4">{currentTime}</h2>
        <div>
          <Chart data={data} />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold my-4">Information</h1>
        <div>
          <Information
            highestTemperature={highestTemperature}
            lowTemperature={lowTemperature}
          />
        </div>
      </div>
      <div>
        <Notification notificationData={notificationData} />
      </div>
      <div>
        <MqttComponent onTemperatureData={handleTemperatureData} />
      </div>
    </LayoutAppRoot>
  );
}
