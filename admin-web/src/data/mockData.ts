export const stats = {
  totalSales: 1250000, // in PHP
  totalOrders: 4850,
  activeMerchants: 124,
  activeDrivers: 86
}

export const merchants = [
  { id: 'm1', name: 'MediCare Pharmacy', email: 'contact@medicare.com', sales: 350000, rating: 4.7 },
  { id: 'm2', name: 'HealthPlus', email: 'owner@healthplus.ph', sales: 210000, rating: 4.5 },
  { id: 'm3', name: 'Town Pharmacy', email: 'hello@townph.com', sales: 125000, rating: 4.2 }
]

export const drivers = [
  { id: 'd1', name: 'Juan Dela Cruz', email: 'juan@drivers.ph', deliveries: 850, rating: 4.8 },
  { id: 'd2', name: 'Maria Santos', email: 'maria@drivers.ph', deliveries: 620, rating: 4.6 }
]

export const orders = [
  { id: 'o1', merchant: 'MediCare Pharmacy', customer: 'John Doe', total: 450, status: 'Delivered', date: '2025-11-25' },
  { id: 'o2', merchant: 'HealthPlus', customer: 'Jane Smith', total: 1200, status: 'In Transit', date: '2025-11-26' }
]
