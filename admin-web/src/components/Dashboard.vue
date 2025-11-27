<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { authFetch } from '../api'

const stats = ref({ totalSales: 0, totalOrders: 0, activeMerchants: 0, activeDrivers: 0 })
const merchants = ref([])

const fetchData = async () => {
  try {
    try {
      const s = await authFetch('/api/stats')
      if (s.ok) stats.value = await s.json()

      const m = await authFetch('/api/merchants')
      if (m.ok) merchants.value = await m.json()
      else if (m.status === 401 || m.status === 403) {
        console.warn('Not authorized for merchants')
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data', err)
    }
  } catch (err) {
    console.error('Failed to fetch dashboard data', err)
  }
}

onMounted(fetchData)
</script>

<template>
  <div>
    <h2 style="color:#1E293B;">Dashboard Overview</h2>
    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
      <div style="background:white;padding:16px;border-radius:8px;width:220px">
        <div style="font-size:12px;color:#64748B">Total Sales (PHP)</div>
        <div style="font-size:20px;font-weight:700;color:#7C2D12">{{ stats.totalSales.toLocaleString() }}</div>
      </div>
      <div style="background:white;padding:16px;border-radius:8px;width:220px">
        <div style="font-size:12px;color:#64748B">Total Orders</div>
        <div style="font-size:20px;font-weight:700;color:#1E293B">{{ stats.totalOrders }}</div>
      </div>
      <div style="background:white;padding:16px;border-radius:8px;width:220px">
        <div style="font-size:12px;color:#64748B">Active Merchants</div>
        <div style="font-size:20px;font-weight:700;color:#059669">{{ stats.activeMerchants }}</div>
      </div>
      <div style="background:white;padding:16px;border-radius:8px;width:220px">
        <div style="font-size:12px;color:#64748B">Active Drivers</div>
        <div style="font-size:20px;font-weight:700;color:#DC2626">{{ stats.activeDrivers }}</div>
      </div>
    </div>

    <div style="margin-top:20px">
      <h3 style="color:#1E293B">Top Merchants</h3>
      <div style="display:flex;gap:12px;margin-top:8px">
        <div v-for="m in merchants" :key="m.id" style="background:white;padding:12px;border-radius:8px;min-width:200px">
          <div style="font-weight:700;color:#1E293B">{{ m.name }}</div>
          <div style="font-size:12px;color:#64748B">Sales: ₱{{ m.sales.toLocaleString() }}</div>
          <div style="font-size:12px;color:#64748B">Rating: {{ m.rating }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
