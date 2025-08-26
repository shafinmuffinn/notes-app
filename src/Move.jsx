import React, { useEffect, useState } from "react";
import { supabase } from "./Login";
import { useNavigate } from "react-router-dom";

export default function Move() {
  const [objects, setObjects] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [fromDistrict, setFromDistrict] = useState("");
  const [toDistrict, setToDistrict] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [cost, setCost] = useState(0);

  const navigate = useNavigate();

  const districts = [
    "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Sylhet",
    "Barisal", "Rangpur", "Mymensingh", "Comilla", "Narsingdi"
  ];

  // fetch object categories from Supabase
  useEffect(() => {
    const fetchObjects = async () => {
      let { data, error } = await supabase.from("object_category").select("*");
      if (error) console.error(error);
      else setObjects(data);
    };
    fetchObjects();
  }, []);

  const toggleObject = (id) => {
    setSelectedObjects((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const calculateCost = (from = fromDistrict, to = toDistrict) => {
    if (from && to) {
      setCost(from === to ? 60 : 120);
    } else {
      setCost(0);
    }
  };

  const handleConfirm = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("User is not logged in");

      const { error } = await supabase.from("move_request").insert([
        {
          user_id: user.id,
          object_ids: selectedObjects,
          from_district: fromDistrict,
          to_district: toDistrict,
          from_address: fromAddress,
          to_address: toAddress,
          cost: cost,
          status: 'pending', // NEW: initial order status
        },
      ]);

      if (error) {
        console.error(error);
        alert("Error saving move request.");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to confirm move request.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-red-600 text-white p-4">
        <button
          id="bt1"
          className="bg-white text-red-600 px-4 py-2 rounded"
          onClick={() => navigate("/dashboard")}
        >
          back
        </button>
        <h1 id="t1" className="text-3xl font-bold">
          MOVE
        </h1>
      </div>

      {/* Object category */}
      <div className="p-6">
        <h2 id="t2" className="mb-2 font-semibold">
          Object category
        </h2>
        <div className="bg-gray-200 p-4 rounded w-4/5">
          <div className="grid grid-cols-2 gap-2">
            {objects.map((obj) => (
              <button
                key={obj.id}
                onClick={() => toggleObject(obj.id)}
                className={`px-3 py-2 rounded ${
                  selectedObjects.includes(obj.id)
                    ? "bg-red-600 text-white"
                    : "bg-white"
                }`}
              >
                {obj.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="p-6">
        <h2 id="t3" className="mb-2 font-semibold">
          Location
        </h2>
        <div className="bg-gray-200 p-4 rounded w-4/5 space-y-3">
          <label className="block">
            <span>From District</span>
            <select
              value={fromDistrict}
              onChange={(e) => {
                setFromDistrict(e.target.value);
                calculateCost(e.target.value, toDistrict);
              }}
              className="w-full p-2 rounded"
            >
              <option value="">Select District</option>
              {districts.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span>To District</span>
            <select
              value={toDistrict}
              onChange={(e) => {
                setToDistrict(e.target.value);
                calculateCost(fromDistrict, e.target.value);
              }}
              className="w-full p-2 rounded"
            >
              <option value="">Select District</option>
              {districts.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </label>

          <input
            type="text"
            placeholder="From address"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
            className="w-full p-2 rounded"
          />
          <input
            type="text"
            placeholder="To address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="w-full p-2 rounded"
          />
        </div>
      </div>

      {/* Cost */}
      <div className="p-6">
        <p className="text-lg font-semibold">Estimated Cost: Tk. {cost}</p>
      </div>

      {/* Confirm */}
      <div className="flex justify-center p-6">
        <button
          id="bt3"
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg"
          onClick={handleConfirm}
        >
          Confirm move
        </button>
      </div>
    </div>
  );
}


// // import { useState } from "react";
// // function BookVehicle() {


// //   return (
// //     <div>
// //       <h1>hello from 'move'</h1>
// //     </div>
// //   )
// //   }

// // export default BookVehicle;

// import React, { useEffect, useState } from "react";
// import { supabase } from "./Login"; // adjust if path differs
// import { useNavigate } from "react-router-dom";
// //import { User } from "lucide-react";

// export default function Move() {
//   const [objects, setObjects] = useState([]);
//   const [selectedObjects, setSelectedObjects] = useState([]);
//   const [fromDistrict, setFromDistrict] = useState("");
//   const [toDistrict, setToDistrict] = useState("");
//   const [fromAddress, setFromAddress] = useState("");
//   const [toAddress, setToAddress] = useState("");

//   const navigate = useNavigate();

//   // fetch object categories from Supabase
//   useEffect(() => {
//     const fetchObjects = async () => {
//       let { data, error } = await supabase.from("object_category").select("*");
//       if (error) console.error(error);
//       else setObjects(data);
//     };
//     fetchObjects();
//   }, []);

//   const toggleObject = (id) => {
//     setSelectedObjects((prev) =>
//       prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
//     );
//   };

//   const handleConfirm = async () => {
    
//     const { data: { user }, error: userError } = await supabase.auth.getUser();
//             if (userError) throw userError;
//             if (!user) throw new Error("User is not logged in");

//     const { error } = await supabase.from("move_request").insert([
//       {
//         user_id: user.id,
//         object_ids: selectedObjects,
//         from_district: fromDistrict,
//         to_district: toDistrict,
//         from_address: fromAddress,
//         to_address: toAddress,
//       },
//     ]);

//     if (error) {
//       console.error(error);
//       alert("Error saving move request.");
//     } else {
//         navigate("/dashboard")
//       //navigate("/confirmation");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* 1st Section */}
//       <div className="flex justify-between items-center bg-red-600 text-white p-4">
//         <button
//           id="bt1"
//           className="bg-white text-red-600 px-4 py-2 rounded"
//           onClick={() => navigate("/dashboard")}
//         >
//           back
//         </button>
//         <h1 id="t1" className="text-3xl font-bold">
//           MOVE
//         </h1>
       
//       </div>

//       {/* 2nd Section */}
//       <div className="p-6">
//         <h2 id="t2" className="mb-2 font-semibold">
//           Object category
//         </h2>
//         <div className="bg-gray-200 p-4 rounded w-4/5">
//           <div className="grid grid-cols-2 gap-2">
//             {objects.map((obj) => (
//               <button
//                 key={obj.id}
//                 onClick={() => toggleObject(obj.id)}
//                 className={`px-3 py-2 rounded ${
//                   selectedObjects.includes(obj.id)
//                     ? "bg-red-600 text-white"
//                     : "bg-white"
//                 }`}
//               >
//                 {obj.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 3rd Section */}
//       <div className="p-6">
//         <h2 id="t3" className="mb-2 font-semibold">
//           Location
//         </h2>
//         <div className="bg-gray-200 p-4 rounded w-4/5 space-y-3">
//           <input
//             type="text"
//             placeholder="From district"
//             value={fromDistrict}
//             onChange={(e) => setFromDistrict(e.target.value)}
//             className="w-full p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="To district"
//             value={toDistrict}
//             onChange={(e) => setToDistrict(e.target.value)}
//             className="w-full p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="From address"
//             value={fromAddress}
//             onChange={(e) => setFromAddress(e.target.value)}
//             className="w-full p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="To address"
//             value={toAddress}
//             onChange={(e) => setToAddress(e.target.value)}
//             className="w-full p-2 rounded"
//           />
//         </div>
//       </div>

//       {/* 4th Section */}
//       <div className="flex justify-center p-6">
//         <button
//           id="bt3"
//           className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg"
//           onClick={handleConfirm}
//         >
//           Confirm payment
//         </button>
//       </div>
//     </div>
//   );
// }
