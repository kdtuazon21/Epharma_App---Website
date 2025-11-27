<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as XLSX from 'xlsx'

const orders = ref([])

const fetchOrders = async () => {
  try {
    const res = await authFetch('/api/orders')
    if (res.ok) orders.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch orders', err)
  }
}

const exportOrders = () => {
  const ws = XLSX.utils.json_to_sheet(orders.value)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Orders')
  XLSX.writeFile(wb, 'orders.xlsx')
}

onMounted(fetchOrders)
</script>

<template>
  <div>
    <h2 style="color:#1E293B">Order Management</h2>
    <div style="margin-top:12px;margin-bottom:12px">
      <button @click="exportOrders" style="background:#4F46E5;color:white;padding:10px;border-radius:8px;border:none">Export to Excel</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <div v-for="o in orders" :key="o.id" style="background:white;padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:700">{{ o.merchant }} — {{ o.id }}</div>
          <div style="font-size:12px;color:#64748B">Customer: {{ o.customer }} • {{ o.date }}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700;color:#1E293B">₱{{ o.total.toLocaleString() }}</div>
          <div style="font-size:12px;color:#64748B">Status: {{ o.status }}</div>
        </div>
        <div style="margin-left:12px;display:flex;flex-direction:column;gap:6px">
          <button @click="editOrder(o)" style="background:#F59E0B;color:white;padding:6px;border-radius:6px;border:none;font-size:12px">Edit</button>
          <button @click="deleteOrder(o.id)" style="background:#DC2626;color:white;padding:6px;border-radius:6px;border:none;font-size:12px">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    async editOrder(o: any) {
      const status = prompt('Order status', o.status)
      if (status === null) return
      try {
        const res = await authFetch(`/api/orders/${o.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        })
        if (!res.ok) throw new Error('Update failed')
        alert('Order updated')
        window.location.reload()
      } catch (err) {
        console.error(err)
        alert('Failed to update order')
      }
    },
    async deleteOrder(id: string) {
      if (!confirm('Delete order?')) return
      try {
        const res = await authFetch(`/api/orders/${id}`, { method: 'DELETE' })
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
