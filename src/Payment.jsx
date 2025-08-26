import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from './Login'

export default function Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const passed = (location && location.state) || {}

  // Expected from Orders.jsx navigate(..., { state: { id, table, amount } })
  const [table, setTable] = useState(passed.table || 'deliveries')
  const [orderId, setOrderId] = useState(passed.id || null)
  const [amount, setAmount] = useState(passed.amount || 0)

  const [method, setMethod] = useState('cod') // 'cod' | 'online'
  const [accountNumber, setAccountNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // If user visits payment page directly (no state), try to read from sessionStorage
  useEffect(() => {
    if (!orderId || !table || !amount) {
      try {
        const cached = JSON.parse(sessionStorage.getItem('paymentDraft') || '{}')
        if (cached?.id) setOrderId(cached.id)
        if (cached?.table) setTable(cached.table)
        if (cached?.amount) setAmount(cached.amount)
      } catch {}
    }
  }, [])

  // Cache in case of refresh
  useEffect(() => {
    sessionStorage.setItem('paymentDraft', JSON.stringify({ id: orderId, table, amount }))
  }, [orderId, table, amount])

  async function handleConfirm(e) {
    e.preventDefault()
    setError('')

    // Simple front-end validation
    if (!orderId || !table) {
      setError('Missing order reference.')
      return
    }

    if (method === 'online') {
      if (!accountNumber || !expiry || !cvv) {
        setError('Please fill all online banking fields.')
        return
      }
    }

    const ok = window.confirm(`Confirm payment of Tk.${amount}?`)
    if (!ok) return

    try {
      setLoading(true)
      // This is a mock payment: just mark the order as paid
      const { error } = await supabase
        .from(table)
        .update({ payment_status: 'paid' })
        .eq('id', orderId)

      if (error) throw error

      // Clean up draft and navigate back
      sessionStorage.removeItem('paymentDraft')
      navigate('/orders')
    } catch (e) {
      setError(e.message || 'Failed to update payment status.')
    } finally {
      setLoading(false)
    }
  }

  function handleCancel() {
    navigate('/orders')
  }

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', padding: '0 16px' }}>
      <h2 style={{ marginBottom: 8 }}>Payment</h2>
      <p style={{ color: '#444', marginBottom: 16 }}>Total amount to pay: <strong>Tk.{amount}</strong></p>

      {error && (
        <div style={{ background: '#ffe6e6', color: '#900', padding: '10px 12px', borderRadius: 8, marginBottom: 12 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleConfirm} style={{ display: 'grid', gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Payment method</span>
          <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}>
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Banking</option>
          </select>
        </label>

        {method === 'online' && (
          <>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Account number</span>
              <input
                type="text"
                placeholder="16–19 digits"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>Expiry date</span>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>CVV</span>
                <input
                  type="password"
                  placeholder="3 digits"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}
                />
              </label>
            </div>
            <small style={{ color: '#666' }}>This is a mock payment screen for testing only.</small>
          </>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button type="button" onClick={handleCancel} style={{ padding: '10px 16px' }}>Cancel</button>
          <button type="submit" disabled={loading} style={{ padding: '10px 16px' }}>{loading ? 'Processing…' : 'Confirm payment'}</button>
        </div>
      </form>
    </div>
  )
}
