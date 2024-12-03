import GaugeComponent from "./components/Gouge";
import LayoutAppRoot from "./layouts/layoutApp";
import Chart from "./components/Chart";
import { useEffect, useState } from "react";
import Information from "./components/Information";
import Notification from "./components/Notification";
import MqttComponent from "./components/MqttComponent";

export default function App() {
  const [value, setValue] = useState(new Date().getSeconds());
  const [data, setData] = useState([
    { name: value, uv: 4000, temperature: 20, amt: 2400 },
  ]);
  const [currentTime, setCurrentTime] = useState("");
  const [highestTemperature, setHighestTemperature] = useState(0);
  const [lowTemperature, setLowTemperature] = useState(0);
  const [notificationData, setNotificationData] = useState([]);
  const [isOn, setIsOn] = useState("mati");

  // use effect untuk clock / jam
  useEffect(() => {
    const interval = setInterval(() => {
      // Mengupdate waktu setiap detik
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString()); // Format waktu
    }, 1000); // Update setiap detik

    return () => clearInterval(interval); // Membersihkan interval saat komponen di-unmount
  }, []);

  // useEffect Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 36);
      setValue(randomValue); // Mengubah nilai temperatur

      const now = new Date();
      const seconds = now.getSeconds();

      const newData = {
        name: seconds.toString(), // Menggunakan panjang array sebagai nama
        temperature: randomValue, // Nilai acak suhu antara 0-50

        // uv: Math.floor(Math.random() * 4000), // Nilai acak untuk uv
        // amt: Math.floor(Math.random() * 2500), // Nilai acak untuk amt
      };

      // meng set data notif ketika suhu lebih dari 30
      if (randomValue > 30 && isOn === "mati") {
        setIsOn("hidup");
  
        const data = {
          temperature: randomValue,
          time: new Date().toLocaleTimeString(),
          type: "on",
        };

        setNotificationData((prev) => [data, ...prev]);
      }

      // meng set data notif ketika alat pendingin mati yaitu dibawah 30 derajat
      if (randomValue < 28 && isOn === "hidup") {
        setIsOn("mati");

        const data = {
          temperature: randomValue,
          time: new Date().toLocaleTimeString(),
          type: "off",
        };

        setNotificationData((prev) => [data, ...prev]);
      }

      // Mengupdate state data dengan menghapus data terlama dan menambahkan data baru
      setData((prevData) => {
        if (prevData.length > 9) {
          const updatedData = [...prevData.slice(1), newData]; // Menghapus data terlama dan menambah data baru

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
    }, 3000);

    return () => clearInterval(interval); // Membersihkan interval saat komponen di-unmount
  }, [isOn]);

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

      {/* informtion */}
      <div>
        <h1 className="text-xl font-semibold my-4">Information</h1>
        <div>
          <Information
            highestTemperature={highestTemperature}
            lowTemperature={lowTemperature}
          />
        </div>
      </div>

      {/* Nofitication */}
      <div>
        <Notification notificationData={notificationData} />
      </div>

      {/* mqtt start */}
      <div>
        {/* <MqttSubcribe /> */}
      </div>

      <div>
      {/* <WebSocketSubscribe /> */}
      </div>

      <div>
        <MqttComponent />
      </div>

      {/* <div>
        <BylnkComponent />
      </div> */}
    </LayoutAppRoot>
  );
}
