import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="recharts-tooltip-wrapper"
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        <h4 style={{ margin: 0 }}>Detik {label}</h4>{" "}
        {/* Ubah header sesuai keinginan */}
        <p style={{ margin: "5px 0" }}>{`Temperature: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function Chart({ data }) {
  return (
    <>
      <LineChart
        width={340}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          label={{
            value: "satuan detik",
            style: { textAnchor: "middle", fontSize: 12 },

            dy: 10,
          }}
          dataKey="name"
          interval={0}
          padding={{ left: 8, right: 8 }} // Menambahkan padding di sini
          tickLine={false} // Menghilangkan garis tick
          tick={{
            fontSize: 12,
            dy: 1,
          }}
        />
        <YAxis
          label={{
            value: "Suhu (C)",
            angle: -90, // Mengatur sudut kemiringan
            position: "", // Posisi label
            style: { textAnchor: "middle", fontSize: 12 },
          }}
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </>
  );
}

// export default class Example extends PureComponent {

//   render() {

//   }
// }
