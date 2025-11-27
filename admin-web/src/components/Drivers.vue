<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as XLSX from 'xlsx'

const drivers = ref([])

const fetchDrivers = async () => {
  try {
    const res = await authFetch('/api/drivers')
    if (res.ok) drivers.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch drivers', err)
  }
}

const exportDrivers = () => {
  const ws = XLSX.utils.json_to_sheet(drivers.value)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Drivers')
  XLSX.writeFile(wb, 'drivers.xlsx')
}

onMounted(fetchDrivers)
</script>

<template>
  <div>
    <h2 style="color:#1E293B">Driver Management</h2>
    <div style="margin-top:12px;margin-bottom:12px">
      <button @click="exportDrivers" style="background:#DC2626;color:white;padding:10px;border-radius:8px;border:none">Export to Excel</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <div v-for="d in drivers" :key="d.id" style="background:white;padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:700">{{ d.name }}</div>
          <div style="font-size:12px;color:#64748B">{{ d.email }}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700;color:#1E293B">Deliveries: {{ d.deliveries }}</div>
          <div style="font-size:12px;color:#64748B">Rating: {{ d.rating }}</div>
        </div>
        <div style="margin-left:12px;display:flex;flex-direction:column;gap:6px">
          <button @click="editDriver(d)" style="background:#F59E0B;color:white;padding:6px;border-radius:6px;border:none;font-size:12px">Edit</button>
          <button @click="deleteDriver(d.id)" style="background:#DC2626;color:white;padding:6px;border-radius:6px;border:none;font-size:12px">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    async editDriver(d: any) {
      const name = prompt('Driver name', d.name)
      if (name === null) return
      const deliveriesStr = prompt('Deliveries (number)', String(d.deliveries))
      if (deliveriesStr === null) return
      const deliveries = Number(deliveriesStr)
      try {
        const res = await authFetch(`/api/drivers/${d.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, deliveries })
        })
        if (!res.ok) throw new Error('Update failed')
        alert('Driver updated')
        window.location.reload()
      } catch (err) {
        console.error(err)
        alert('Failed to update driver')
      }
    },
    async deleteDriver(id: string) {
      if (!confirm('Delete driver?')) return
      try {
        const res = await authFetch(`/api/drivers/${id}`, { method: 'DELETE' })
        if (res.status !== 204) throw new Error('Delete failed')
        alert('Deleted')
        window.location.reload()
      } catch (err) {
        console.error(err)
        alert('Failed to delete')
      }
    }
  }
})
</script>
