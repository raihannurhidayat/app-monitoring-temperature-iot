import GaugeComponent from "./components/Gouge";
import LayoutAppRoot from "./layouts/layoutApp";
import Chart from "./components/Chart";
import { useEffect, useState } from "react";

export default function App() {
  const [value, setValue] = useState(new Date().getSeconds());
  const [data, setData] = useState([
    { name: value, uv: 4000, temperature: 20, amt: 2400 },
  ]);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Mengupdate waktu setiap detik
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString()); // Format waktu
    }, 1000); // Update setiap detik

    return () => clearInterval(interval); // Membersihkan interval saat komponen di-unmount
  }, []);

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

      // Mengupdate state data dengan menghapus data terlama dan menambahkan data baru
      setData((prevData) => {
        if (prevData.length > 9) {
          const updatedData = [...prevData.slice(1), newData]; // Menghapus data terlama dan menambah data baru
          return updatedData;
        }
        const updatedData = [...prevData, newData];
        return updatedData;
      });
    }, 3000);

    return () => clearInterval(interval); // Membersihkan interval saat komponen di-unmount
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

      {/* Rekap */}
      <div>
    
      </div>

    </LayoutAppRoot>
  );
}
