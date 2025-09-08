import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import './home.css'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Navigate, useNavigate } from 'react-router-dom';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY);

console.log('app is running')



function App() {

  const [session, setSession] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }})

  if (!session) {
    return (
      <div>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            style: {
            input: { color: 'white' }},
            className: 'no-social' }}
          providers={[]}
        />
      </div>
    );
  }
}

export default App;

