import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

const MqttComponent = () => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const brokerUrl = "wss://mqtt-dashboard.com:8884/mqtt"; // Ganti dengan URL broker MQTT Anda
  const topic = "sisdig/24/sensor/kelembapan"; // Ganti dengan topik yang relevan
  const topicTemperature = "sisdig/24/sensor/suhu"; // Ganti dengan topik yang relevan

  useEffect(() => {
    // Buat koneksi ke broker MQTT
    const mqttClient = mqtt.connect(brokerUrl);

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      setIsConnected(true);

      // Berlangganan ke topik tertentu
      mqttClient.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topic}`);
        } else {
          console.error("Failed to subscribe:", err);
        }
      });
    });

    mqttClient.on("message", (topic, message) => {
      console.log(`Message received on topic ${topic}: ${message.toString()}`);
      setMessages((prevMessages) => [
        ...prevMessages,
        { topic, message: message.toString() },
      ]);
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT connection error:", err);
    });

    mqttClient.on("close", () => {
      console.log("Disconnected from MQTT broker");
      setIsConnected(false);
    });

    setClient(mqttClient);

    // Cleanup saat komponen di-unmount
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [brokerUrl, topic]);

  useEffect(() => {
    // Buat koneksi ke broker MQTT
    const mqttClient = mqtt.connect(brokerUrl);

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      setIsConnected(true);

      // Berlangganan ke topik tertentu
      mqttClient.subscribe(topicTemperature, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topicTemperature}`);
        } else {
          console.error("Failed to subscribe:", err);
        }
      });
    });

    mqttClient.on("message", (topic, message) => {
      console.log(`Message received on topic ${topic}: ${message.toString()}`);
      setMessages((prevMessages) => [
        ...prevMessages,
        { topic, message: message.toString() },
      ]);
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT connection error:", err);
    });

    mqttClient.on("close", () => {
      console.log("Disconnected from MQTT broker");
      setIsConnected(false);
    });

    setClient(mqttClient);

    // Cleanup saat komponen di-unmount
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [brokerUrl, topicTemperature]);

  const sendMessage = (msg) => {
    if (client && isConnected) {
      client.publish(topic, msg);
      console.log(`Message sent to topic ${topic}: ${msg}`);
    } else {
      console.error("Not connected to MQTT broker");
    }
  };

  return (
    <div>
      <h1>MQTT Client</h1>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <button onClick={() => sendMessage("Hello MQTT!")}>Send Message</button>
      <h2>Received Messages:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.topic}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MqttComponent;
