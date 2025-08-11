import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('app is running')
function App() {
  console.log("app is running")
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log("useEffect is running");
    getNotes();
  }, []);

  async function getNotes() {
    console.log("Fetching notes...");
    const { data, error } = await supabase
      .from("notes") 
      .select("content"); 

    if (error) {
    console.error("Error fetching notes:", error);
  } else {
    console.log("Fetched notes:", data); 
    setNotes(data);
  }
  }

  return (
    <div>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note.content}</li>
        ))}
      </ul>
      <h1>hello from app.js, updated</h1>
    </div>
  );
}

export default App;

