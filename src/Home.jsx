// src/Home.jsx
import { Link } from "react-router-dom";
import './home.css'

export default function Home() {
  return (
    <body>
    <div>
      <h1>Welcome to our website</h1>
      <p>This is the home page. You can log in to continue.</p>

      <Link to="/login">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Login
        </button>
      </Link>
    </div>
    </body>
  );
}
