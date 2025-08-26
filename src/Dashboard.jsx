import { useNavigate } from "react-router-dom";
import { supabase } from './Login'; 
import './home.css'
export default function Dashboard() {
  const navigate = useNavigate();
  
  const handleViewOrders = () => {
    navigate("/orders");
  };

  const handleProfile = () => {
    navigate("/update-profile")
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleBookVehicle = () => {
    navigate("/book-vehicle");
    //alert("Move option is under construction.");
  };

  const handleMakeDelivery = () => {
    navigate("/make-delivery");
  };

  const handleMove = () => {
    navigate("/move")
    //alert("Move option is under construction.");
  };

return (
  <div>
    {/* Top Navigation Bar */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "40px 30px",   // adjust spacing inside the bar
        //borderBottom: "1px solid #ddd",
        position: "fixed",      // stick to top
        top: 0,
        left: 0,
        right: 0,
        background: "#222831",     // solid background so it’s visible
        zIndex: 1000,           // keeps it above content
      }}
    >
      {/* Left: Home */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{ padding: "8px 16px", fontSize: "16px" }}
      >
        Home
      </button>

      {/* Right: Profile, Orders, Logout */}
      <div style={{ display: "flex", gap: "12px"}}>
        <button
          onClick={handleProfile}
          style={{ padding: "8px 16px", fontSize: "16px" }}
        >
          Profile
        </button>
        <button
          onClick={handleViewOrders}
          style={{ padding: "8px 16px", fontSize: "16px" }}
        >
          My Orders
        </button>
        <button
          onClick={handleLogout}
          style={{ padding: "8px 16px", fontSize: "16px" }}
        >
          Log Out
        </button>
      </div>
    </div>

    {/* Main Content (pushed down so it doesn't hide behind navbar) */}
    <div style={{ maxWidth: 900, margin: "80px auto 24px", padding: "0 16px" }}>
      <h1>Welcome to Your Dashboard</h1>
      {/* <p>Choose one of the options below:</p> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          flexWrap: "wrap",
        }}
      >
        <button style={{ width: 190, height: 100, fontSize: 18 }} onClick={handleBookVehicle}>
          Book a Vehicle
        </button>
        <button style={{ width: 190, height: 100, fontSize: 18 }} onClick={handleMakeDelivery}>
          Make a Delivery
        </button>
        <button style={{ width: 190, height: 100, fontSize: 18 }} onClick={handleMove}>
          Move
        </button>
      </div>
    </div>
  </div>
);



  // return (
  //   <div style={{ maxWidth: 600, margin: "24px auto", padding: "0 16px" }}>
  //     <h1>Welcome to Your Dashboard</h1>
  //     <button onClick={handleViewOrders} style={{ padding: "10px 20px", fontSize: "16px" }}>
  //         My Orders
  //       </button>
  //     <p>Choose one of the options below:</p>

  //     {/* Option Buttons */}
      
  //     <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        
  //       <button onClick={handleBookVehicle} style={{ padding: "10px 20px", fontSize: "16px" }}>
  //         Book a Vehicle
  //       </button>

  //       <button onClick={handleMakeDelivery} style={{ padding: "10px 20px", fontSize: "16px" }}>
  //         Make a Delivery
  //       </button>

  //       <button onClick={handleMove} style={{ padding: "10px 20px", fontSize: "16px" }}>
  //         Move
  //       </button>
  //       {/* Log Out Button */}
  //       <button onClick={handleLogout} style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}>
  //         Log Out
  //       </button>
  //     </div>
  //   </div>
  // );
}
