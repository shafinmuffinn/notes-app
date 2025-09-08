import React, { useState, useEffect } from "react";
import { supabase } from "./Login"; // Use the Supabase client
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleMakePayment(order) {
  if (!order?.cost) {
    alert('No payable amount found.');
    return;
  }
  navigate('/payment', {
    state: {
      id: order.id,
      table: order._table,
      amount: order.cost,
    },
  });
}


  const fetchOrders = async () => {
    setLoading(true);
    try {
      const userId = (await supabase.auth.getUser()).data.user.id;

      const { data: deliveries, error: deliveryError } = await supabase
        .from("deliveries")
        .select("*")
        .eq("user_id", userId);
      if (deliveryError) throw deliveryError;

      const { data: move_request, error: move_requestError } = await supabase
        .from("move_request")
        .select("*")
        .eq("user_id", userId);
      if (move_requestError) throw move_requestError; // ✅



      const normalize = (row, type) => ({
      ...row,
      orderType: type,
      // unify the date used by the table & sorter
      date: row.delivery_date || row.move_date || row.date,
      // unify address fields if your schemas differ
      from_address: row.from_address || row.pickup_address || row.from || row.origin || "-",
      to_address: row.to_address || row.dropoff_address || row.to || row.destination || "-",
      // remember source table for updates
      _table: type === "Delivery" ? "deliveries" : "move_request",
    });

      // Fetch vehicle bookings
    //   const { data: vehicles, error: vehicleError } = await supabase
    //     .from("vehicle_bookings")
    //     .select("*")
    //     .eq("user_id", userId);
    //   if (vehicleError) throw vehicleError;

      // Merge both and add type for reference
      // const allOrders = [
      //   ...deliveries.map(d => ({ ...d, orderType: "Delivery" })),
      //   ...move_request.map(m => ({ ...m, orderType: "Move Request" })) // ✅

      // ];
      const allOrders = [
        ...deliveries.map(d => normalize(d, "Delivery")),
        ...move_request.map(m => normalize(m, "Move Request")),
      ];

      allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

      setOrders(allOrders);

    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const handleChangeStatus = async (order) => {
  const confirmChange = window.confirm(
    "Do you want to change the status to 'delivered'? This action cannot be undone."
  );
  if (!confirmChange) return;

  try {
    const tableName =
      order._table ||
      (order.orderType === "Delivery" ? "deliveries" :
       order.orderType === "Move Request" ? "move_request" :
       "deliveries"); // fallback

    const { error } = await supabase
      .from(tableName)
      .update({ status: "delivered" })
      .eq("id", order.id);

    if (error) throw error;

    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: "delivered" } : o));
    alert("Status updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to update status. Check console for details.");
  }
};


  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "24px auto", padding: "0 16px" }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        
    <table
    style={{
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed", // ✅ forces equal width columns
        marginTop: "16px"
    }}
>
  <thead>
    <tr>
      <th style={{ border: "1px solid #ccc", padding: "8px", width: "16.66%", wordWrap: "break-word", textAlign: "center" }}>Type</th>
      <th style={{ border: "1px solid #ccc", padding: "8px", width: "16.66%", wordWrap: "break-word", textAlign: "center" }}>From</th>
      <th style={{ border: "1px solid #ccc", padding: "8px", width: "16.66%", wordWrap: "break-word", textAlign: "center" }}>To</th>
      <th style={{ border: "1px solid #ccc", padding: "8px", width: "16.66%", wordWrap: "break-word", textAlign: "center" }}>Date</th>
      <th style={{ border: "1px solid #ccc", padding: "8px", width: "16.66%", wordWrap: "break-word", textAlign: "center" }}>Status</th>
      <th style={{ border: "1px solid #ccc", padding: "8px", width: "16.66%", wordWrap: "break-word", textAlign: "center" }}>Action</th>
      <th style={{ border: "1px solid #ccc", padding: "8px", width: "16.66%", wordWrap: "break-word", textAlign: "center" }}>Cost (Tk)</th>
      <th style={{ border: "1px solid #ccc", padding: "8px", width: "16.66%", wordWrap: "break-word", textAlign: "center" }}>Paymentt</th>
      <th style={{ border: "1px solid #ccc", padding: "8px", width: "16.66%", wordWrap: "break-word", textAlign: "center" }}>Track</th>
    </tr>
  </thead>
  <tbody>
    {orders.map(order => (
      <tr key={order.id}>
        <td style={{ border: "1px solid #ccc", padding: "8px", wordWrap: "break-word" }}>{order.orderType}</td>
        <td style={{ border: "1px solid #ccc", padding: "8px", wordWrap: "break-word" }}>{order.from_address || "-"}</td>
        <td style={{ border: "1px solid #ccc", padding: "8px", wordWrap: "break-word" }}>{order.to_address || "-"}</td>
        <td style={{ border: "1px solid #ccc", padding: "8px", wordWrap: "break-word" }}>{order.delivery_date || order.date}</td>
        <td style={{ border: "1px solid #ccc", padding: "8px", wordWrap: "break-word" }}>{order.status}</td>
        <td style={{ border: "1px solid #ccc", padding: "8px", wordWrap: "break-word", textAlign: "center" }}>

          {order.status === "pending" && (
            <button style={{
                padding: "6px 12px",
                cursor: "pointer",
                backgroundColor: "#ff9800", // orange for pending
                color: "white",
                border: "none",
                borderRadius: "4px"
            }} onClick={() => handleChangeStatus(order)}>Mark as Delivered</button>
                )}
                
          {order.status === "delivered" && (
            <button style={{
                padding: "6px 12px",
                backgroundColor: "#4CAF50", // green for delivered
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "default" // no pointer since it does nothing
            }}
      disabled>Confirmed</button>
          )}
        </td>
      <td style={{ border: "1px solid #ccc", padding: "8px", wordWrap: "break-word", textAlign: "center" }}>{order.cost ?? "-"}</td>
      <td style={{ border: "1px solid #ccc", padding: "8px", wordWrap: "break-word", textAlign: "center" }}>
        {order.payment_status === "paid" ? (
          <span style={{ color: "#2e7d32", fontWeight: 600 }}>Paid</span>
        ) : (
          <button
            style={{ padding: "6px 12px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
            onClick={() => handleMakePayment(order)}
          >
            Make payment
          </button>
        )}
        
      </td>
      <td><button onClick={() => navigate('/track', {
        state: {
          table: order._table,        // 'deliveries' | 'move_request'
          id: order.id,
          pickup: { lat: order.pickup_lat, lng: order.pickup_lng },
          dropoff: { lat: order.dropoff_lat, lng: order.dropoff_lng },
        }
      })}>
        Track
      </button>
      </td>
      </tr>
    ))}
  </tbody>
</table>


      )}
    </div>
  );
}
