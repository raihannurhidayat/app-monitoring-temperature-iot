import { GaugeComponent as Component } from "react-gauge-component";

const GaugeComponent = ({ value }) => {
  
  return (
    <Component
    className="w-full"
      arc={{
        width: 0.2,
        padding: 0.005,
        cornerRadius: 1,
        // gradient: true,
        subArcs: [
          {
            limit: 12,
            color: "#0D47A1",
            showTick: true,
            tooltip: {
              text: "Too low temperature!",
            },
          },
          {
            limit: 17,
            color: "#FFEB3B",
            showTick: true,
            tooltip: {
              text: "Low temperature!",
            },
          },
          {
            limit: 24,
            color: "#5BE12C",
            showTick: true,
            tooltip: {
              text: "Ok temperature!",
            },
          },
          {
            limit: 30,
            color: "#FFEB3B",
            showTick: true,
            tooltip: {
              text: "OK temperature!",
            },
          },
          {
            color: "#F44336",
            tooltip: {
              text: "Too high temperature!",
            },
          },
        ],
      }}
      pointer={{
        color: "#345243",
        length: 0.8,
        type: "needle",
        width: 15,
        // elastic: true,
      }}
      labels={{
        valueLabel: { formatTextValue: (value) => value + "ºC" },
        tickLabels: {
          type: "outer",
          defaultTickValueConfig: {
            formatTextValue: (value) => value + "ºC",
            style: { fontSize: 10 },
          },
          // ticks: [
          //   { value: 13 },
          //   { value: 22.5 },
          //   { value: 32 }
          // ],
        },
      }}
      value={value}
      minValue={0}
      maxValue={35}
    />
  );
};

export default GaugeComponent;
