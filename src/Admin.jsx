import React, { useState, useEffect } from "react";
import { supabase } from "./Login";  // Importing the existing supabase client

function Admin() {
  const [deliveries, setDeliveries] = useState([]);  // State to store deliveries
  const [loading, setLoading] = useState(false); // Loading state
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is admin

  // Check if the logged-in user is an admin
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.log("Error fetching user:", error.message);
        return;
      }

      // Check if the user has the 'admin' role in user_metadata
      if (user && user.user_metadata?.role === "admin") {
        setIsAdmin(true); // Grant access if the user is an admin
      } else {
        setIsAdmin(false); // Deny access for non-admin users
      }
    };

    checkAdmin();
  }, []);

  // Fetch all deliveries (only for admins)
  useEffect(() => {
    const fetchDeliveries = async () => {
      if (isAdmin) {
        setLoading(true);
        try {
          // Fetch all deliveries from the 'deliveries' table
          const { data, error } = await supabase
            .from("deliveries")  // Assuming the deliveries table holds the delivery information
            .select("*");

          if (error) {
            console.log("Error fetching deliveries:", error.message);
          } else {
            setDeliveries(data); // Set deliveries for the admin view
          }
        } catch (error) {
          console.log("Error fetching deliveries:", error.message);
        } finally {
          setLoading(false); // Stop loading once the data is fetched
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
