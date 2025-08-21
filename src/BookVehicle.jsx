
// function BookVehicle() {


//   return (
//     <div>
//       <h1>hello from 'book vehicle'</h1>
//     </div>
//   )
//   }

// export default BookVehicle;
import { useState, useEffect } from "react";

function BookVehicle() {
  const [fromDistrict, setFromDistrict] = useState("");
  const [toDistrict, setToDistrict] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [cost, setCost] = useState(null);

  // Hardcoded districts
  const districts = [
    { name: "Dhaka", id: 1 },
    { name: "Chittagong", id: 2 },
    { name: "Rajshahi", id: 3 },
    { name: "Khulna", id: 4 },
    { name: "Sylhet", id: 5 },
    { name: "Barisal", id: 6 },
    { name: "Rangpur", id: 7 },
    { name: "Mymensingh", id: 8 },
    { name: "Comilla", id: 9 },
    { name: "Narsingdi", id: 10 },
    { name: "Bogura", id: 11 },
    { name: "Cumilla", id: 12 },
    { name: "Jessore", id: 13 },
    { name: "Narayanganj", id: 14 },
    { name: "Pabna", id: 15 },
    { name: "Dinajpur", id: 16 },
    { name: "Meherpur", id: 17 },
    { name: "Jhalokathi", id: 18 },
    { name: "Patuakhali", id: 19 },
    { name: "Brahmanbaria", id: 20 },
  ];

  // Cost list for each district → to other districts
  const districtCostList = [
    { 1: [1, 2, 3, 2, 4, 2, 3, 1.5, 5, 6, 4, 2, 3, 2, 4, 2, 3, 1.5, 5, 6] },
    { 2: [2, 1, 3, 1.5, 5, 2, 3, 1.5, 5, 4, 2, 3, 3, 2, 4, 2, 3, 6, 5, 4] },
    { 3: [3, 2, 1, 2, 2.5, 3, 2.2, 2.5, 4, 3, 2, 1.5, 2, 3, 2.3, 2, 2.1, 3, 4, 3] },
    { 4: [2, 1.5, 2, 1, 2.3, 1.8, 2, 1.7, 3, 2, 1, 2.5, 2.2, 2.5, 2, 2.1, 2.4, 2.5, 2.3, 1.9] },
    { 5: [4, 5, 2.5, 2.3, 1, 3, 4.5, 3.7, 3, 4.5, 3.2, 2.5, 2.8, 3, 3.3, 3.1, 2.7, 4, 4, 3.5] },
    // ... continue with your other district entries ...
    { 20: [6, 4, 3.5, 1.9, 3.5, 3, 3.3, 2.3, 3, 3.5, 3.3, 3, 3.3, 3.5, 3.2, 3.1, 3, 3.4, 3.2, 1] },
  ];

  // Calculate cost whenever districts change
  useEffect(() => {
    if (fromDistrict && toDistrict) {
      const costEntry = districtCostList.find((entry) => entry[fromDistrict]);
      if (costEntry) {
        const costArray = costEntry[fromDistrict];
        setCost(costArray[toDistrict - 1]); // Arrays are 0-indexed
      } else {
        setCost(null);
      }
    }
  }, [fromDistrict, toDistrict]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed from ${fromAddress} (${fromDistrict}) to ${toAddress} (${toDistrict}). Cost: ${cost} units`);




    
  };

  return (
    <div style={{ maxWidth: 600, margin: "24px auto", padding: "0 16px" }}>
      <h2>Book a Vehicle</h2>

      <form onSubmit={handleSubmit}>
        {/* From Address */}
        <label>From District</label>
        <select
          value={fromDistrict}
          onChange={(e) => setFromDistrict(Number(e.target.value))}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Additional address details"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
        />

        {/* To Address */}
        <label>To District</label>
        <select
          value={toDistrict}
          onChange={(e) => setToDistrict(Number(e.target.value))}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Additional address details"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />

        {/* Date and Time */}
        <label>Choose Date and Time</label>
        <input type="datetime-local" />

        {/* Dynamic Cost */}
        {cost && (
          <div>
            <p>Estimated Cost: {cost} units</p>
          </div>
        )}

        {/* Submit */}
        <button type="submit">Book Vehicle</button>
      </form>
    </div>
  );
}

export default BookVehicle;

// BookVehicle.jsx
// import { useState, useEffect } from "react";
// import { supabase } from "./Login"; // adjust path if needed

// export default function BookVehicle() {
//   const [fromDistrict, setFromDistrict] = useState("");
//   const [toDistrict, setToDistrict] = useState("");
//   const [fromAddress, setFromAddress] = useState("");
//   const [toAddress, setToAddress] = useState("");
//   const [departureAt, setDepartureAt] = useState(""); // datetime-local input value
//   const [cost, setCost] = useState(null);
//   const [loadingPrice, setLoadingPrice] = useState(false);
//   const [booking, setBooking] = useState({ saving: false, error: null });

//   // Hardcoded districts (match the SQL IDs exactly)
//   const districts = [
//     { name: "Dhaka", id: 1 },
//     { name: "Chittagong", id: 2 },
//     { name: "Rajshahi", id: 3 },
//     { name: "Khulna", id: 4 },
//     { name: "Sylhet", id: 5 },
//     { name: "Barisal", id: 6 },
//     { name: "Rangpur", id: 7 },
//     { name: "Mymensingh", id: 8 },
//     { name: "Comilla", id: 9 },
//     { name: "Narsingdi", id: 10 },
//     { name: "Bogura", id: 11 },
//     { name: "Cumilla", id: 12 },
//     { name: "Jessore", id: 13 },
//     { name: "Narayanganj", id: 14 },
//     { name: "Pabna", id: 15 },
//     { name: "Dinajpur", id: 16 },
//     { name: "Meherpur", id: 17 },
//     { name: "Jhalokathi", id: 18 },
//     { name: "Patuakhali", id: 19 },
//     { name: "Brahmanbaria", id: 20 },
//   ];

//   // Fetch price from Supabase whenever from/to changes
//   useEffect(() => {
//     const fetchPrice = async () => {
//       setCost(null);
//       if (!fromDistrict || !toDistrict) return;

//       try {
//         setLoadingPrice(true);
//         const { data, error } = await supabase
//           .from("district_cost")
//           .select("price")
//           .eq("from_district_id", Number(fromDistrict))
//           .eq("to_district_id", Number(toDistrict))
//           .single();

//         if (error) {
//           console.error("Price fetch error:", error);
//           setCost(null);
//         } else {
//           setCost(data?.price ?? null);
//         }
//       } finally {
//         setLoadingPrice(false);
//       }
//     };

//     fetchPrice();
//   }, [fromDistrict, toDistrict]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBooking({ saving: true, error: null });

//     try {
//       // Confirm user is logged in (optional; insert trigger can fill user_id)
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) throw new Error("You must be logged in to book a vehicle.");

//       // Compose payload. You may omit user_id and/or cost if you enabled triggers.
//       const payload = {
//         // user_id: user.id, // ← omit if you enabled set_user_id trigger
//         from_district_id: Number(fromDistrict),
//         to_district_id: Number(toDistrict),
//         from_address: fromAddress || null,
//         to_address: toAddress || null,
//         departure_at: departureAt ? new Date(departureAt).toISOString() : null,
//         // cost, // ← omit to let DB compute it via set_vehicle_cost trigger
//       };

//       const { data, error } = await supabase
//         .from("vehicle_booking")
//         .insert([payload])
//         .select()
//         .single();

//       if (error) throw error;

//       alert("Booking created successfully!");
//       // Reset form (optional)
//       setFromDistrict("");
//       setToDistrict("");
//       setFromAddress("");
//       setToAddress("");
//       setDepartureAt("");
//       setCost(null);
//     } catch (err) {
//       console.error("Booking error:", err);
//       setBooking({ saving: false, error: err.message || "Failed to create booking." });
//       return;
//     } finally {
//       setBooking((b) => ({ ...b, saving: false }));
//     }
//   };

//   const canSubmit =
//     Number(fromDistrict) > 0 &&
//     Number(toDistrict) > 0 &&
//     fromAddress.trim().length > 0 &&
//     toAddress.trim().length > 0 &&
//     departureAt.length > 0;

//   return (
//     <div style={{ maxWidth: 600, margin: "24px auto", padding: "0 16px" }}>
//       <h2>Book a Vehicle</h2>

//       <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
//         {/* From Address */}
//         <label>From District</label>
//         <select
//           value={fromDistrict}
//           onChange={(e) => setFromDistrict(e.target.value)}
//         >
//           <option value="">Select District</option>
//           {districts.map((district) => (
//             <option key={district.id} value={district.id}>
//               {district.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Additional address details"
//           value={fromAddress}
//           onChange={(e) => setFromAddress(e.target.value)}
//         />

//         {/* To Address */}
//         <label>To District</label>
//         <select
//           value={toDistrict}
//           onChange={(e) => setToDistrict(e.target.value)}
//         >
//           <option value="">Select District</option>
//           {districts.map((district) => (
//             <option key={district.id} value={district.id}>
//               {district.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Additional address details"
//           value={toAddress}
//           onChange={(e) => setToAddress(e.target.value)}
//         />

//         {/* Date and Time */}
//         <label>Choose Date and Time</label>
//         <input
//           type="datetime-local"
//           value={departureAt}
//           onChange={(e) => setDepartureAt(e.target.value)}
//         />

//         {/* Dynamic Cost */}
//         <div style={{ minHeight: 32, display: "flex", alignItems: "center" }}>
//           {loadingPrice ? (
//             <span>Calculating cost…</span>
//           ) : cost != null ? (
//             <strong>Estimated Cost: {Number(cost).toFixed(2)} units</strong>
//           ) : fromDistrict && toDistrict ? (
//             <span style={{ color: "#b00" }}>
//               No rate available for this route yet.
//             </span>
//           ) : null}
//         </div>

//         {/* Submit */}
//         <button type="submit" disabled={!canSubmit || booking.saving}>
//           {booking.saving ? "Booking…" : "Book Vehicle"}
//         </button>

//         {booking.error && (
//           <div style={{ color: "#b00" }}>{booking.error}</div>
//         )}
//       </form>
//     </div>
//   );
// }
