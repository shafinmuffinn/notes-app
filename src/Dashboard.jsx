import { useNavigate } from "react-router-dom"; // Use navigate for navigation
import { supabase } from './Login'; 
import './home.css'
export default function Dashboard() {
  const navigate = useNavigate(); // React Router's useNavigate for programmatic navigation
  
  const handleLogout = async () => {
    await supabase.auth.signOut();  // Log the user out
    navigate("/");  // Redirect to login page after logging out
  };
  // Function to navigate to Book Vehicle page
  const handleBookVehicle = () => {
    alert("Move option is under construction.");
    //navigate("/book-vehicle");
  };

  // Future handlers for "Make a Delivery" and "Move"
  const handleMakeDelivery = () => {
    navigate("/make-delivery");
  };

  const handleMove = () => {
    alert("Move option is under construction.");
  };

  return (
    <div style={{ maxWidth: 600, margin: "24px auto", padding: "0 16px" }}>
      <h1>Welcome to Your Dashboard</h1>
      <p>Choose one of the options below:</p>

      {/* Option Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <button onClick={handleBookVehicle} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Book a Vehicle
        </button>

        <button onClick={handleMakeDelivery} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Make a Delivery
        </button>

        <button onClick={handleMove} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Move
        </button>
        {/* Log Out Button */}
        <button onClick={handleLogout} style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}>
          Log Out
        </button>
      </div>
    </div>
  );
}
