import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const ParkingApp = () => {
  const [slots, setSlots] = useState([
    { id: 1, x: 50, y: 150, status: "Available" },
    { id: 2, x: 150, y: 150, status: "Occupied" },
    { id: 3, x: 50, y: 250, status: "Available" },
    { id: 4, x: 150, y: 250, status: "Occupied" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    vehicleNumber: "",
    time: "",
    slotId: null,
  });

  const [bookings, setBookings] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = (e) => {
    e.preventDefault();

    // Validasi jika slot belum dipilih
    if (!formData.slotId) {
      console.log("Slot ID is null:", formData.slotId);
      alert("Please select a parking slot!");
      return;
    }

    // Cek apakah slot yang dipilih tersedia
    const selectedSlot = slots.find((slot) => slot.id === formData.slotId);
    if (!selectedSlot || selectedSlot.status !== "Available") {
      alert("The selected slot is not available!");
      return;
    }

    // Update slot status
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === formData.slotId ? { ...slot, status: "Occupied" } : slot
      )
    );

    // Tambahkan data booking ke state bookings
    setBookings((prevBookings) => [
      ...prevBookings,
      {
        id: formData.slotId,
        name: formData.name,
        vehicleNumber: formData.vehicleNumber,
        time: formData.time,
      },
    ]);

    alert("Booking successful!");
    setFormData({ name: "", vehicleNumber: "", time: "", slotId: null });
  };

  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {/* Header */}
          <Rect
            x={0}
            y={0}
            width={window.innerWidth}
            height={100}
            fill="#00796b"
            shadowBlur={5}
          />
          <Text
            x={20}
            y={20}
            text="Parking Management System"
            fontSize={30}
            fill="white"
            fontFamily="Roboto"
          />

          {/* Slots */}
          {slots.map((slot) => (
            <Rect
              key={slot.id}
              x={slot.x}
              y={slot.y}
              width={80}
              height={80}
              fill={slot.status === "Available" ? "#4caf50" : "#f44336"}
              shadowBlur={5}
              cornerRadius={5}
              onClick={() => {
                console.log(`Slot ${slot.id} clicked`);
                setFormData((prev) => ({ ...prev, slotId: slot.id }));
              }}
            />
          ))}
          {slots.map((slot) => (
            <Text
              key={`text-${slot.id}`}
              x={slot.x + 20}
              y={slot.y + 30}
              text={`Slot ${slot.id}`}
              fontSize={16}
              fill="white"
              fontFamily="Roboto"
            />
          ))}
        </Layer>
      </Stage>

      {/* Booking Form */}
      <div style={{ position: "absolute", top: 400, left: 30, right: 30 }}>
        <h2 style={{ color: "#00796b" }}>Book a Parking Slot</h2>
        <form onSubmit={handleBooking} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            style={{
              padding: "10px",
              marginBottom: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            required
          />
          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
            style={{
              padding: "10px",
              marginBottom: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            style={{
              padding: "10px",
              marginBottom: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#00796b",
              color: "white",
              borderRadius: "5px",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParkingApp;
