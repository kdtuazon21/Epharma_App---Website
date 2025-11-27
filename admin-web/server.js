const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

const stats = {
  totalSales: 1250000,
  totalOrders: 4850,
  activeMerchants: 124,
  activeDrivers: 86
}

let merchants = [
  { id: 'm1', name: 'MediCare Pharmacy', email: 'contact@medicare.com', sales: 350000, rating: 4.7 },
  { id: 'm2', name: 'HealthPlus', email: 'owner@healthplus.ph', sales: 210000, rating: 4.5 },
  { id: 'm3', name: 'Town Pharmacy', email: 'hello@townph.com', sales: 125000, rating: 4.2 }
]

let drivers = [
  { id: 'd1', name: 'Juan Dela Cruz', email: 'juan@drivers.ph', deliveries: 850, rating: 4.8 },
  { id: 'd2', name: 'Maria Santos', email: 'maria@drivers.ph', deliveries: 620, rating: 4.6 }
]

let orders = [
  { id: 'o1', merchant: 'MediCare Pharmacy', customer: 'John Doe', total: 450, status: 'Delivered', date: '2025-11-25' },
  { id: 'o2', merchant: 'HealthPlus', customer: 'Jane Smith', total: 1200, status: 'In Transit', date: '2025-11-26' }
]

// Simple in-memory users (passwords hashed)
const users = [
  { id: 'u1', email: 'admin@platform.local', passwordHash: bcrypt.hashSync('adminpassword', 8), role: 'admin' }
]

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Invalid Authorization header' })

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' })
    req.user = user
    next()
  })
}

app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const passwordMatch = bcrypt.compareSync(password, user.passwordHash)
  if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' })

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' })
  res.json({ token })
})

// Protected endpoints: require JWT
app.get('/api/stats', authenticateJWT, (req, res) => {
  res.json(stats)
})

app.get('/api/merchants', authenticateJWT, (req, res) => {
  res.json(merchants)
})

app.post('/api/merchants', authenticateJWT, (req, res) => {
  const m = req.body
  m.id = 'm' + (Math.random().toString(36).substr(2, 9))
  merchants.push(m)
  res.status(201).json(m)
})

app.put('/api/merchants/:id', authenticateJWT, (req, res) => {
  const id = req.params.id
  const idx = merchants.findIndex(x => x.id === id)
  if (idx === -1) return res.status(404).json({ message: 'Merchant not found' })
  merchants[idx] = { ...merchants[idx], ...req.body }
  res.json(merchants[idx])
})

app.delete('/api/merchants/:id', authenticateJWT, (req, res) => {
  const id = req.params.id
  merchants = merchants.filter(x => x.id !== id)
  res.status(204).end()
})

app.get('/api/drivers', authenticateJWT, (req, res) => {
  res.json(drivers)
})

app.post('/api/drivers', authenticateJWT, (req, res) => {
  const d = req.body
  d.id = 'd' + (Math.random().toString(36).substr(2, 9))
  drivers.push(d)
  res.status(201).json(d)
})

app.put('/api/drivers/:id', authenticateJWT, (req, res) => {
  const id = req.params.id
  const idx = drivers.findIndex(x => x.id === id)
  if (idx === -1) return res.status(404).json({ message: 'Driver not found' })
  drivers[idx] = { ...drivers[idx], ...req.body }
  res.json(drivers[idx])
})

app.delete('/api/drivers/:id', authenticateJWT, (req, res) => {
  const id = req.params.id
  drivers = drivers.filter(x => x.id !== id)
  res.status(204).end()
})

app.get('/api/orders', authenticateJWT, (req, res) => {
  res.json(orders)
})

app.post('/api/orders', authenticateJWT, (req, res) => {
  const o = req.body
  o.id = 'o' + (Math.random().toString(36).substr(2, 9))
  orders.push(o)
  res.status(201).json(o)
})

app.put('/api/orders/:id', authenticateJWT, (req, res) => {
  const id = req.params.id
  const idx = orders.findIndex(x => x.id === id)
  if (idx === -1) return res.status(404).json({ message: 'Order not found' })
  orders[idx] = { ...orders[idx], ...req.body }
  res.json(orders[idx])
})

app.delete('/api/orders/:id', authenticateJWT, (req, res) => {
  const id = req.params.id
  orders = orders.filter(x => x.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`)
})
