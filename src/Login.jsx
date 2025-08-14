import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
//import './app.css'
import './home.css'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Navigate, useNavigate } from 'react-router-dom';
//import Dashboard from './Dashboard' 
// Initialize Supabase client
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('app is running')



function App() {
  const [notes, setNotes] = useState([]);
  const [session, setSession] = useState(null);
  const [newNote, setNewNote] = useState("");      // 🆕 state for composing a note
  const [saving, setSaving] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    // Check the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in authentication state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, []);

  // Fetch notes only if the user is logged in
  useEffect(() => {
    if (session) {
      navigate("/dashboard");
      //getNotes();
    }
  }, [session]);

  async function getNotes() {
  if (!session) return;
  const userId = session.user.id;            // <-- the current user's id

  const { data, error } = await supabase
    .from("notes")
    .select("id, content")
    .eq("user_id", userId)                   // <-- filter on the client, too
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
  } else {
    setNotes(data || []);
  }
}

  async function addNote(content) {
    try {
      setSaving(true);

      // If you added the auto-fill trigger, you can just send { content }.
      const payload = { content, user_id: session.user.id };

      const { error } = await supabase.from("notes").insert([payload]);
      if (error) throw error;

      setNewNote("");
      await getNotes(); // refresh list
    } catch (err) {
      console.error("addNote error:", err);
      alert("Could not save the note. Check console for details.");
    } finally {
      setSaving(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = newNote.trim();
    if (!content) return;
    await addNote(content);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate('/');
  };

  if (!session) {
    return (
      <div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa, className: "no-social" }}
          providers={[]}
        />
      </div>
    );
  }
 
  return (
    
    <div>
      <Auth 
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa, className: 'no-social' }}
        providers={[]} 
      />
    </div>

  //   <div style={{ maxWidth: 600, margin: "24px auto", padding: "0 16px" }}>
  //     <h1>Your Notes</h1>

  //     {/* 📝 Compose form */}
  //     <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
  //       <textarea
  //         value={newNote}
  //         onChange={(e) => setNewNote(e.target.value)}
  //         placeholder="Write a note..."
  //         rows={4}
  //         style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
  //         required
  //       />
  //       <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
  //         <button type="submit" disabled={saving || !newNote.trim()}>
  //           {saving ? "Saving..." : "Save note"}
  //         </button>
  //         <button type="button" onClick={() => setNewNote("")} disabled={saving}>
  //           Clear
  //         </button>
  //       </div>
  //     </form>

  //     {/* 📄 Notes list */}
  //     <ul>
  //       {notes.map((note) => (
  //         <li key={note.id} style={{ marginBottom: 8 }}>
  //           {note.content}
  //         </li>
  //       ))}
  //     </ul>

  //     <button onClick={handleLogout} style={{ marginTop: 16 }}>Log Out</button>
  //   </div>
  // 
  );

}

export default App;

