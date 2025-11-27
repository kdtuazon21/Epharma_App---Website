<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as XLSX from 'xlsx'

const merchants = ref([])

const fetchMerchants = async () => {
  try {
    const res = await authFetch('/api/merchants')
    if (res.ok) merchants.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch merchants', err)
  }
}

const exportMerchants = () => {
  const ws = XLSX.utils.json_to_sheet(merchants.value)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Merchants')
  XLSX.writeFile(wb, 'merchants.xlsx')
}

onMounted(fetchMerchants)
</script>

<template>
  <div>
    <h2 style="color:#1E293B">Merchant Management</h2>
    <div style="margin-top:12px;margin-bottom:12px">
      <button @click="exportMerchants" style="background:#059669;color:white;padding:10px;border-radius:8px;border:none">Export to Excel</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <div v-for="m in merchants" :key="m.id" style="background:white;padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:700">{{ m.name }}</div>
          <div style="font-size:12px;color:#64748B">{{ m.email }}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700;color:#7C2D12">₱{{ m.sales.toLocaleString() }}</div>
          <div style="font-size:12px;color:#64748B">Rating: {{ m.rating }}</div>
        </div>
        <div style="margin-left:12px;display:flex;flex-direction:column;gap:6px">
          <button @click="editMerchant(m)" style="background:#F59E0B;color:white;padding:6px;border-radius:6px;border:none;font-size:12px">Edit</button>
          <button @click="deleteMerchant(m.id)" style="background:#DC2626;color:white;padding:6px;border-radius:6px;border:none;font-size:12px">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    async editMerchant(m: any) {
      const name = prompt('Merchant name', m.name)
      if (name === null) return
      const salesStr = prompt('Sales (number)', String(m.sales))
      if (salesStr === null) return
      const sales = Number(salesStr)

      try {
          const res = await authFetch(`/api/merchants/${m.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, sales })
          })
        if (!res.ok) throw new Error('Update failed')
        alert('Merchant updated')
        window.location.reload()
      } catch (err) {
        console.error(err)
        alert('Failed to update merchant')
      }
    },
    async deleteMerchant(id: string) {
      if (!confirm('Delete merchant?')) return
      try {
        const res = await authFetch(`/api/merchants/${id}`, { method: 'DELETE' })
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
