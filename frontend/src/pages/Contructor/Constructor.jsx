import React, { useEffect, useState } from "react";
import "./CakeConstructor.scss";

export default function CakeConstructor() {
  const [sponge, setSponge] = useState("shokoladli");
  const [cream, setCream] = useState("shokolad");
  const [decoration, setDecoration] = useState("mevali");
  const [status, setStatus] = useState("");

  const [address, setAddress] = useState("");

 

  const [bakers, setBakers] = useState([]);
  const [bakerId, setBakerId] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/bakers")
      .then((res) => res.json())
      .then((data) => setBakers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleOrder = async () => {
    setStatus("Yuborilmoqda...");

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const deliveryInfo = {
      name: user.name || "Anonim",
      phone: user.phone || "",
      address,
    };

    const orderBody = { sponge, cream, decoration, deliveryInfo, bakerId };

    try {
      const response = await fetch("http://localhost:5000/api/orders/custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderBody),
      });

      if (response.ok) {
        setStatus("✅ Buyurtma yuborildi!");
      } else {
        setStatus("❌ Xatolik yuz berdi!");
      }
    } catch (error) {
        console.error(error); // Log the error for debugging
      setStatus("❌ Server bilan bog‘lanib bo‘lmadi!");
    }
  };

  return (
    <div className="cake-constructor">
      <h1>🍰 Tort Konstruktor</h1>

      <div className="options">
        <div className="category">
          <h2>Biskvit</h2>
          {["shokoladli", "vanilli", "qizil barhat"].map((opt) => (
            <label key={opt}>
              <input
                type="radio"
                name="sponge"
                value={opt}
                checked={sponge === opt}
                onChange={(e) => setSponge(e.target.value)}
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="category">
          <h2>Krem</h2>
          {["shokolad", "vanil", "pista"].map((opt) => (
            <label key={opt}>
              <input
                type="radio"
                name="cream"
                value={opt}
                checked={cream === opt}
                onChange={(e) => setCream(e.target.value)}
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="category">
          <h2>Dekoratsiya</h2>
          {["mevali", "shokoladli", "oddiy"].map((opt) => (
            <label key={opt}>
              <input
                type="radio"
                name="decoration"
                value={opt}
                checked={decoration === opt}
                onChange={(e) => setDecoration(e.target.value)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="category">
        <h2>👨‍🍳 Baker tanlang</h2>
        <select
          value={bakerId}
          onChange={(e) => setBakerId(e.target.value)}
          required
        >
          <option value="">-- Tanlang --</option>
          {bakers.map((baker) => (
            <option key={baker._id} value={baker._id}>
              {baker.name}
            </option>
          ))}
        </select>
      </div>

      <div className="delivery">
        <h2>📦 Yetkazib berish ma'lumoti</h2>
        <p>
          Ism:{" "}
          {JSON.parse(localStorage.getItem("user") || "{}")?.name ||
            "⚠️ Kirilmagan"}
        </p>
        <p>
          Tel:{" "}
          {JSON.parse(localStorage.getItem("user") || "{}")?.phone ||
            "⚠️ Kirilmagan"}
        </p>
        <input
          type="text"
          placeholder="Manzil"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="result">
        <h2>🧁 Sizning tortingiz:</h2>
        <p>
          {sponge} biskvit, {cream} krem va {decoration} dekoratsiya
        </p>
        <button className="order-btn" onClick={handleOrder}>
          Buyurtma berish
        </button>
        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}
