import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

const MqttComponent = ({ onTemperatureData }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const brokerUrl = "wss://mqtt-dashboard.com:8884/mqtt"; // Ganti dengan URL broker MQTT Anda
  const topicTemperature = "sisdig/24/sensor/suhu"; // Ganti dengan topik yang relevan

  useEffect(() => {
    const mqttClient = mqtt.connect(brokerUrl);

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      setIsConnected(true);

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
        console.log(`Temperature received: ${temperature}`);
        if (onTemperatureData) {
          onTemperatureData(temperature);
        }
      }
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT connection error:", err);
    });

    mqttClient.on("close", () => {
      console.log("Disconnected from MQTT broker");
      setIsConnected(false);
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [brokerUrl, topicTemperature, onTemperatureData]);

  return (
    <div>
      <h1>MQTT Client</h1>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
    </div>
  );
};

export default MqttComponent;
