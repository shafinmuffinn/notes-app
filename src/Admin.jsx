import React, { useState, useEffect } from "react";
import { supabase } from "./Login"; 

function Admin() {
  const [deliveries, setDeliveries] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.log("Error fetching user:", error.message);
        return;
      }
      if (user && user.user_metadata?.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  useEffect(() => {
    const fetchDeliveries = async () => {
      if (isAdmin) {
        setLoading(true);
        try {

          const { data, error } = await supabase
            .from("deliveries")
            .select("*");

          if (error) {
            console.log("Error fetching deliveries:", error.message);
          } else {
            setDeliveries(data);
          }
        } catch (error) {
          console.log("Error fetching deliveries:", error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDeliveries();
  }, [isAdmin]); // Re-run the fetch if the admin status changes

  // Handle delivery status change for a selected delivery
  const handleStatusChange = async (deliveryId, newStatus) => {
    setLoading(true);
    try {
      // Update the delivery status in the 'deliveries' table
      const { data, error } = await supabase
        .from("deliveries") // Update delivery status in the deliveries table
        .update({ delivery_status: newStatus })
        .eq("id", deliveryId);  // Specify which delivery to update

      if (error) {
        console.log("Error updating status:", error.message);
      } else {
        console.log("Status updated successfully:", data);
        // Refresh deliveries after update
        setDeliveries(deliveries.map(delivery => 
          delivery.id === deliveryId ? { ...delivery, delivery_status: newStatus } : delivery
        ));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // If the user is not an admin, deny access
  if (!isAdmin) {
    return <p>You do not have access to the admin dashboard.</p>;
  }

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <h2>All Deliveries</h2>
      {loading && <p>Loading deliveries...</p>}
      <ul>
        {deliveries.length === 0 ? (
          <li>No deliveries found.</li>
        ) : (
          deliveries.map((delivery) => (
            <li key={delivery.id}>
              <div className="delivery-item">
                <p>Delivery ID: {delivery.id}</p>
                <p>Current Status: {delivery.delivery_status}</p>

                {/* Dropdown to change delivery status */}
                <select 
                  value={delivery.delivery_status} 
                  onChange={(e) => handleStatusChange(delivery.id, e.target.value)} 
                  disabled={loading}
                >
                  <option value="Transaction pending">Transaction pending</option>
                  <option value="Product picked by delivery man">Product picked by delivery man</option>
                  <option value="Ready for shipment">Ready for shipment</option>
                </select>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Admin;
