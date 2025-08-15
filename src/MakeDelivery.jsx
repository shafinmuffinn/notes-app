import React, { useState } from "react";
import { supabase } from "./Login"; // Use the initialized Supabase client
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router-dom';

export default function MakeDelivery() {
  const [deliveryType, setDeliveryType] = useState("regular");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [districtFrom, setDistrictFrom] = useState("");
  const [districtTo, setDistrictTo] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(""); // for time-sensitive
  const [occasionType, setOccasionType] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [wrappingRequired, setWrappingRequired] = useState(false);
  const [customNote, setCustomNote] = useState("");
  const [parcelDescription, setParcelDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Example list of districts (hardcoded for now)
  const districts = [
    "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Sylhet",
    "Barisal", "Rangpur", "Mymensingh", "Comilla", "Narsingdi"
  ];

  // Dummy cost calculation based on district selection
  const calculateCost = () => {
    if (districtFrom && districtTo) {
      setCost(districtFrom === districtTo ? 10 : 20); // simple rule
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error("User is not logged in");

      // Insert into deliveries table)
      const { data: deliveryData, error: deliveryError } = await supabase
        .from("deliveries")
        .insert([{
          user_id: user.id,
          delivery_type: deliveryType,
          from_address: fromAddress,
          to_address: toAddress,
          district_from: districts.indexOf(districtFrom) + 1,
          district_to: districts.indexOf(districtTo) + 1,
          delivery_date: deliveryDate,
          cost: cost,
        }])
        .select()
        .single();

      if (deliveryError) throw deliveryError;

      const deliveryId = deliveryData.id;

      // Insert into type-specific tables
      if (deliveryType === "time_sensitive") {
        const { error } = await supabase
          .from("time_sensitive_delivery")
          .insert([{
            delivery_id: deliveryId,
            delivery_time: deliveryTime,
            occasion_type: occasionType,
            gift_message: giftMessage
          }]);
        if (error) throw error;
      }

      if (deliveryType === "special") {
        const { error } = await supabase
          .from("special_delivery")
          .insert([{
            delivery_id: deliveryId,
            wrapping_required: wrappingRequired,
            custom_note: customNote,
            parcel_description: parcelDescription
          }]);
        if (error) throw error;
      }

      alert("Delivery created successfully!");
      navigate('/orders')

      // Reset form
      setFromAddress(""); setToAddress(""); setDistrictFrom(""); setDistrictTo("");
      setDeliveryDate(""); setDeliveryTime(""); setOccasionType(""); setGiftMessage("");
      setWrappingRequired(false); setCustomNote(""); setParcelDescription(""); setCost(0);

    } catch (err) {
      console.error(err);
      alert("Failed to create delivery. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
  style={{
    maxWidth: 600,
    margin: "24px auto",
    padding: "0 16px",
  }}
>
  <h2>Make a Delivery</h2>

  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    {/* Delivery Type */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Delivery Type</label>
      <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)}>
        <option value="regular">Regular Delivery</option>
        <option value="time_sensitive">Time-Sensitive / Birthday</option>
        <option value="special">Special Delivery</option>
      </select>
    </div>

    {/* From Address */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>From District</label>
      <select value={districtFrom} onChange={(e) => { setDistrictFrom(e.target.value); calculateCost(); }}>
        <option value="">Select District</option>
        {districts.map((d, i) => <option key={i} value={d}>{d}</option>)}
      </select>
      <input type="text" placeholder="From Address" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} />
    </div>

    {/* To Address */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>To District</label>
      <select value={districtTo} onChange={(e) => { setDistrictTo(e.target.value); calculateCost(); }}>
        <option value="">Select District</option>
        {districts.map((d, i) => <option key={i} value={d}>{d}</option>)}
      </select>
      <input type="text" placeholder="To Address" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
    </div>

    {/* Delivery Date */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Delivery Date</label>
      <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
    </div>

    {/* Time-Sensitive Fields */}
    {deliveryType === "time_sensitive" && (
      <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Delivery Time</label>
          <input type="time" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Occasion Type</label>
          <input type="text" value={occasionType} onChange={(e) => setOccasionType(e.target.value)} placeholder="Birthday, Anniversary..." />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Gift Message</label>
          <textarea value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} placeholder="Message for the recipient"></textarea>
        </div>
      </>
    )}

    {/* Special Delivery Fields */}
    {deliveryType === "special" && (
      <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            <input type="checkbox" checked={wrappingRequired} onChange={(e) => setWrappingRequired(e.target.checked)} />
            Wrapping Required
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Custom Note</label>
          <textarea value={customNote} onChange={(e) => setCustomNote(e.target.value)} placeholder="Custom note for the recipient"></textarea>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Parcel Description</label>
          <textarea value={parcelDescription} onChange={(e) => setParcelDescription(e.target.value)} placeholder="Description of parcel contents"></textarea>
        </div>
      </>
    )}

    <p>Estimated Cost: {cost}</p>

    <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Delivery"}</button>
  </form>
</div>

  );
}
