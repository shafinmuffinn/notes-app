import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './Login'

export default function UpdateProfile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [displayName, setDisplayName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadUser() {
      try {
        setLoading(true)
        const {
          data: { user },
          error
        } = await supabase.auth.getUser()
        if (error) throw error
        if (!user) {
          navigate('/login')
          return
        }
        const md = user.user_metadata || {}
        if (isMounted) {
          setDisplayName(md.display_name || '')
          setPhone(md.phone || '')
        }
      } catch (e) {
        if (isMounted) setError(e.message || 'Failed to load user')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadUser()
    return () => {
      isMounted = false
    }
  }, [navigate])

  async function handleSave(e) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      setLoading(true)

      // Store profile fields in Auth user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: displayName,
          phone: phone
        }
      })
      if (error) throw error

      setSuccess('Profile updated successfully.')
    } catch (e) {
      setError(e.message || 'Something went wrong while updating your profile.')
    } finally {
      setLoading(false)
    }
  }

  function handleBack() {
    navigate('/dashboard')
  }

  return (
    <div style={{ maxWidth: 520, margin: '80px auto 24px', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Update Profile</h2>
        <button onClick={handleBack} style={{ padding: '8px 14px' }}>Back</button>
      </div>

      {loading && (
        <div style={{ marginBottom: 16 }}>Loading...</div>
      )}

      {error && (
        <div style={{ background: '#ffe6e6', color: '#900', padding: '10px 12px', borderRadius: 8, marginBottom: 12 }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ background: '#e6ffed', color: '#065f46', padding: '10px 12px', borderRadius: 8, marginBottom: 12 }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'grid', gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Display name</span>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g., Alex Rider"
            style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Phone</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g., +1 555 0100"
            style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '10px 16px', fontSize: 16 }}
        >
          {loading ? 'Saving…' : 'Save changes'}
        </button>
      </form>

      
    </div>
  )
}
