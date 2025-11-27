<script setup lang="ts">
import { ref } from 'vue'
import Dashboard from './components/Dashboard.vue'
import Merchants from './components/Merchants.vue'
import Drivers from './components/Drivers.vue'
import Orders from './components/Orders.vue'

const tab = ref<'dashboard'|'merchants'|'drivers'|'orders'>('dashboard')
const token = ref<string | null>(localStorage.getItem('token'))
const email = ref('')
const password = ref('')

const setToken = (t: string | null) => {
  token.value = t
  if (t) localStorage.setItem('token', t)
  else localStorage.removeItem('token')
}

const login = async () => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    if (!res.ok) {
      const err = await res.json()
      alert('Login failed: ' + (err.message || res.status))
      return
    }
    const body = await res.json()
    // backend returns accessToken and refreshToken
    setToken(body.accessToken)
    if (body.refreshToken) localStorage.setItem('refreshToken', body.refreshToken)
    email.value = ''
    password.value = ''
    // refresh UI by reloading content
    window.location.reload()
  } catch (err) {
    console.error(err)
    alert('Login error')
  }
}

const logout = () => {
  setToken(null)
  window.location.reload()
}
</script>

<style>
*{box-sizing:border-box}
body{font-family:Inter, system-ui, Arial, sans-serif;margin:0}
.app{height:100vh;display:flex;flex-direction:column}
.topbar{background:#7C2D12;color:white;padding:14px 20px;display:flex;align-items:center;justify-content:space-between}
.nav{display:flex;gap:12px}
.nav button{background:transparent;border:none;color:rgba(255,255,255,0.9);padding:8px 12px;border-radius:8px;cursor:pointer}
.nav button.active{background:rgba(255,255,255,0.12)}
.content{flex:1;padding:20px;background:#F8FAFC}
</style>

<div class="app">
    <div class="topbar">
    <div style="font-weight:700">Admin Web — Delivery Platform (PHP)</div>
    <div style="display:flex;align-items:center;gap:12px">
      <div class="nav">
        <button :class="{active: tab === 'dashboard'}" @click="tab = 'dashboard'">Dashboard</button>
        <button :class="{active: tab === 'merchants'}" @click="tab = 'merchants'">Merchants</button>
        <button :class="{active: tab === 'drivers'}" @click="tab = 'drivers'">Drivers</button>
        <button :class="{active: tab === 'orders'}" @click="tab = 'orders'">Orders</button>
      </div>
      <div style="margin-left:18px">
        <template v-if="!token">
          <input v-model="email" placeholder="email" style="padding:6px;border-radius:6px;border:1px solid #ddd;margin-right:6px" />
          <input v-model="password" type="password" placeholder="password" style="padding:6px;border-radius:6px;border:1px solid #ddd;margin-right:6px" />
          <button @click="login" style="background:#059669;color:white;padding:8px;border-radius:8px;border:none">Login</button>
        </template>
        <template v-else>
          <button @click="logout" style="background:#DC2626;color:white;padding:8px;border-radius:8px;border:none">Logout</button>
        </template>
      </div>
    </div>
  </div>
  <div class="content">
    <Dashboard v-if="tab === 'dashboard'" />
    <Merchants v-if="tab === 'merchants'" />
    <Drivers v-if="tab === 'drivers'" />
    <Orders v-if="tab === 'orders'" />
  </div>
</div>
