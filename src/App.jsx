import GaugeComponent from "./components/Gouge";
import LayoutAppRoot from "./layouts/layoutApp";
import Chart from "./components/Chart";
import { useEffect, useState } from "react";
import Information from "./components/Information";
import Notification from "./components/Notification";
import mqtt from "mqtt";

export default function App() {
  const [value, setValue] = useState(0); // Data suhu
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [highestTemperature, setHighestTemperature] = useState(0);
  const [lowTemperature, setLowTemperature] = useState(0);
  const [notificationData, setNotificationData] = useState([]);
  const [isOn, setIsOn] = useState("mati");

  // MQTT configurations
  const brokerUrl = "wss://mqtt-dashboard.com:8884/mqtt"; // URL broker MQTT
  const topicTemperature = "sisdig/24/sensor/suhu"; // Topik untuk data suhu

  // useEffect untuk koneksi MQTT
  useEffect(() => {
    const mqttClient = mqtt.connect(brokerUrl);

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.subscribe(topicTemperature, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topicTemperature}`);
        } else {
          console.error("Failed to subscribe:", err);
        }
      });
    });

    mqttClient.on("message", (topic, message) => {
      if (topic === topicTemperature) {
        const temperature = parseFloat(message.toString());
        setValue(temperature); // Mengupdate suhu dari MQTT

        const now = new Date();
        const seconds = now.getSeconds();

        const newData = {
          name: seconds.toString(),
          temperature: temperature,
        };

        // Menangani notifikasi
        if (temperature > 30 && isOn === "mati") {
          setIsOn("hidup");
          const data = {
            temperature: temperature,
            time: now.toLocaleTimeString(),
            type: "on",
          };
          setNotificationData((prev) => [data, ...prev]);
        }

        if (temperature < 28 && isOn === "hidup") {
          setIsOn("mati");
          const data = {
            temperature: temperature,
            time: now.toLocaleTimeString(),
            type: "off",
          };
          setNotificationData((prev) => [data, ...prev]);
        }

        // Mengupdate data untuk grafik
        setData((prevData) => {
          if (prevData.length > 9) {
            const updatedData = [...prevData.slice(1), newData];

            const currentHighest = Math.max(
              ...updatedData.map((item) => item.temperature)
            );

            const currentLow = Math.min(
              ...updatedData.map((item) => item.temperature)
            );

            setHighestTemperature(currentHighest);
            setLowTemperature(currentLow);

            return updatedData;
          }
          const updatedData = [...prevData, newData];

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
      }
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT connection error:", err);
    });

    mqttClient.on("close", () => {
      console.log("Disconnected from MQTT broker");
    });

    // Cleanup saat komponen di-unmount
    return () => {
      mqttClient.end();
    };
  }, [brokerUrl, topicTemperature, isOn]);

  // useEffect untuk clock / jam
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LayoutAppRoot>
      <h1 className="text-3xl text-center font-bold">Monitoring App</h1>
      {/* Gouge component */}
      <div className="my-3 mx-auto">
        <GaugeComponent value={value} />
      </div>
      {/* Grafik Components */}
      <div className="pt-12 mx-auto">
        <h1 className="text-xl font-semibold my-4">Grafik Temperature</h1>
        <h2 className="text-lg my-4">{currentTime}</h2>
        <div>
          <Chart data={data} />
        </div>
      </div>
      {/* Information */}
      <div>
        <h1 className="text-xl font-semibold my-4">Information</h1>
        <div>
          <Information
            highestTemperature={highestTemperature}
            lowTemperature={lowTemperature}
          />
        </div>
      </div>
      {/* Notification */}
      <div>
        <Notification notificationData={notificationData} />
      </div>
    </LayoutAppRoot>
  );
}
