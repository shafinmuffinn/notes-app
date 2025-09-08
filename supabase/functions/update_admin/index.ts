import { createClient } from '@supabase/supabase-js';

//Initialize Supabase client using environment variables (set through Supabase secrets)
const supabase = createClient(
  process.env.SUPABASE_URL,   // Your Supabase URL
  process.env.SUPABASE_ANON_KEY  // Your Supabase anon key
);

export default async (req, res) => {
  // Ensure it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.body;  // Get the userId from the request body

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Update the user's role to 'admin'
    const { data, error } = await supabase.auth.api.updateUserById(userId, {
      data: { role: 'admin' },  // Set the role to 'admin'
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'User role updated to admin', data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
