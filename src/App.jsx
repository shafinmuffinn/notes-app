import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('app is running')
function App() {
  console.log("app is running")
  const [notes, setNotes] = useState([]);  // State to store fetched notes

  // Fetch the notes when the component mounts
  useEffect(() => {
    console.log("useEffect is running");
    getNotes();
  }, []);

  // Function to fetch notes from the Supabase database
  async function getNotes() {
    console.log("Fetching notes...");
    const { data, error } = await supabase
      .from("notes")  // Specify the 'notes' table
      .select("content");  // Select the 'content' column

    if (error) {
    console.error("Error fetching notes:", error);
  } else {
    console.log("Fetched notes:", data); // Add this to see the data in the console
    setNotes(data);
  }
  }

  return (
    <div>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note.content}</li>  // Display the 'content' of each note
        ))}
      </ul>
      <h1>hello from app.jsx</h1> {/* This will render below the list of notes */}
    </div>
  );
}

export default App;

