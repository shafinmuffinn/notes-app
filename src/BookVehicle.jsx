import { useState } from "react";
function BookVehicle() {


  return (
    <div>
      <h1>hello from 'book vehicle'</h1>
    </div>
  )
  }

export default BookVehicle;

// function BookVehicle() {
//   const [fromDistrict, setFromDistrict] = useState(null);
//   const [toDistrict, setToDistrict] = useState(null);
//   const [fromAddress, setFromAddress] = useState("");
//   const [toAddress, setToAddress] = useState("");
//   const [cost, setCost] = useState(null);

//   // Hardcoded districts and cost list
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
//     { name: "Brahmanbaria", id: 20 }
//   ];

//   const districtCostList = [
//     { 1: [1, 2, 3, 2, 4, 2, 3, 1.5, 5, 6, 4, 2, 3, 2, 4, 2, 3, 1.5, 5, 6] },
//     { 2: [2, 1, 3, 1.5, 5, 2, 3, 1.5, 5, 4, 2, 3, 3, 2, 4, 2, 3, 6, 5, 4] },
//     { 3: [3, 2, 1, 2, 2.5, 3, 2.2, 2.5, 4, 3, 2, 1.5, 2, 3, 2.3, 2, 2.1, 3, 4, 3] },
//     { 4: [2, 1.5, 2, 1, 2.3, 1.8, 2, 1.7, 3, 2, 1, 2.5, 2.2, 2.5, 2, 2.1, 2.4, 2.5, 2.3, 1.9] },
//     { 5: [4, 5, 2.5, 2.3, 1, 3, 4.5, 3.7, 3, 4.5, 3.2, 2.5, 2.8, 3, 3.3, 3.1, 2.7, 4, 4, 3.5] },
//     { 6: [2, 2, 3, 1.8, 3, 1, 2.2, 2.5, 3.2, 3, 2.5, 2.3, 3.3, 3.1, 2.8, 3.2, 2.5, 3, 3.4, 3] },
//     { 7: [3, 2, 2.2, 2, 4.5, 2.2, 1, 2.5, 4, 3.5, 2.8, 3.4, 3.2, 2.9, 2.3, 2.1, 2.7, 3, 4.1, 3.2] },
//     { 8: [1.5, 1.5, 2.5, 1.7, 3.7, 2.5, 2.5, 1, 3.2, 3.1, 2.9, 2.8, 2.2, 2.5, 2.1, 2.3, 2.4, 2, 2.5, 2.3] },
//     { 9: [5, 5, 4, 3, 3, 3.2, 4, 3.2, 1, 4, 3.5, 3, 2.5, 3.3, 3.1, 4, 3.2, 3, 2.8, 3.2] },
//     { 10: [6, 4, 3, 2, 4.5, 3, 3.5, 3.1, 4.5, 1, 3.1, 3.3, 4, 3.2, 3.3, 3.5, 3, 2.8, 3.1, 4.2] },
//     { 11: [4, 2, 2, 1, 3.2, 2.5, 2.8, 2.9, 3.5, 3.1, 1, 2.8, 2.5, 3, 3.2, 2.8, 3, 2.9, 3.1, 3.3] },
//     { 12: [2, 3, 1.5, 2.5, 2.8, 2.3, 3.4, 2.8, 3, 3.3, 2.8, 1, 1.7, 2, 2.2, 2.5, 2, 3, 2.7, 2.9] },
//     { 13: [3, 3, 2, 2, 3, 3.3, 3.2, 3.2, 2.5, 4, 2.8, 2.5, 1, 2.5, 2.9, 3.1, 3.2, 3, 3.5, 3.3] },
//     { 14: [2, 2, 3, 2, 3, 3.1, 2.9, 2.5, 3.3, 3.2, 3, 2, 2.5, 1, 3, 3.2, 3.1, 2.9, 2.5, 3.2] },
//     { 15: [4, 2, 2.3, 2, 3.2, 2.5, 2.8, 2.3, 3.1, 3.5, 3.2, 2.5, 2.9, 3, 1, 3.1, 3.5, 3, 3.1, 3.2] },
//     { 16: [2, 4, 2.1, 2.1, 3, 2.8, 3, 2.4, 3, 3, 2.8, 2.8, 2.5, 3.2, 3.1, 1, 3.3, 3.5, 3.1, 3.5] },
//     { 17: [3, 3, 2.5, 2.3, 2.9, 2.5, 3.2, 2.4, 3, 3.1, 3.2, 3, 3.1, 2.9, 3, 3.5, 3.2, 1, 2.8, 3.1] },
//     { 18: [1.5, 6, 3, 2.1, 4, 3.4, 4.1, 2, 2.8, 4.2, 3.3, 2.7, 2.5, 3.2, 3.5, 3, 3.1, 2.8, 1, 3.1] },
//     { 19: [5, 4, 4, 2.5, 4, 3, 3.2, 2.5, 3.2, 3.1, 3, 2.9, 2.7, 2.9, 3.1, 3.2, 3.5, 3.1, 3, 1] },
//     { 20: [6, 4, 3.5, 1.9, 3.5, 3, 3.3, 2.3, 3, 3.5, 3.3, 3, 3.3, 3.5, 3.2, 3.1, 3, 3.4, 3.2, 1] }
//   ];

//   // Function to calculate cost
//   const calculateCost = () => {
//     if (fromDistrict && toDistrict) {
//       const costEntry = districtCostList.find(
//         (entry) => entry[fromDistrict] !== undefined
//       );
//       if (costEntry) {
//         const costArray = costEntry[fromDistrict];
//         setCost(costArray[toDistrict - 1]); // Subtract 1 since array is 0-indexed
//       } else {
//         setCost("N/A");
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "24px auto", padding: "0 16px" }}>
//       <h2>Book a Vehicle</h2>

//       <form>
//         {/* From Address */}
//         <label>From District</label>
//         <select
//           value={fromDistrict}
//           onChange={(e) => {
//             setFromDistrict(Number(e.target.value));
//             calculateCost();
//           }}
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
//           onChange={(e) => {
//             setToDistrict(Number(e.target.value));
//             calculateCost();
//           }}
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
//         <input type="datetime-local" />

//         {/* Dynamic Cost */}
//         {cost && (
//           <div>
//             <p>Estimated Cost: {cost} units</p>
//           </div>
//         )}

//         {/* Submit */}
//         <button type="submit">Book Vehicle</button>
//       </form>
//     </div>
//   );
// }

// export default BookVehicle;
