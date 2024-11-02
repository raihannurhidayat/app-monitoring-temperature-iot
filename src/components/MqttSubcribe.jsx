import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

const MqttSubcribe = () => {
  const [temperature, setTemperature] = useState("");

  const brokerUrl = "";
  const topic = "sensor/temperature";

  useEffect(() => {
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Connected Mqtt");
      client.subscribe(topic);
    });

    client.on("message", (topic, message) => {
      const data = message.toString();
      setTemperature(data);
      console.log(`Received temperature ${data}`);
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  return (
    <div>
      <h1>MqttSubcribe</h1>
      Temperature {temperature}
    </div>
  );
};

export default MqttSubcribe;
