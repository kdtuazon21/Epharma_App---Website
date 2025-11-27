import { ref } from 'vue'

let refreshingToken = false
let refreshPromise: Promise<string | null> | null = null

function decodeToken(token: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const decoded = JSON.parse(atob(parts[1]))
    return decoded
  } catch {
    return null
  }
}

function isTokenExpiringSoon(token: string, thresholdSeconds = 300): boolean {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return true
  const expiresIn = (decoded.exp * 1000) - Date.now()
  return expiresIn < (thresholdSeconds * 1000)
}

export async function refreshAccessToken(): Promise<string | null> {
  if (refreshingToken && refreshPromise) {
    return refreshPromise
  }

  refreshingToken = true
  refreshPromise = (async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      refreshingToken = false
      return null
    }
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      })
      if (!res.ok) {
        refreshingToken = false
        return null
      }
      const body = await res.json()
      if (body.accessToken) localStorage.setItem('accessToken', body.accessToken)
      if (body.refreshToken) localStorage.setItem('refreshToken', body.refreshToken)
      refreshingToken = false
      return body.accessToken
    } catch (err) {
      console.error('refresh failed', err)
      refreshingToken = false
      return null
    }
  })()
  return refreshPromise
}

export async function authFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const headers: any = init?.headers ? { ...(init.headers as any) } : {}
  let token = localStorage.getItem('accessToken')

  // Proactively refresh token if expiring soon (< 5 minutes)
  if (token && isTokenExpiringSoon(token, 300)) {
    const newToken = await refreshAccessToken()
    if (newToken) token = newToken
  }

  if (token) headers['Authorization'] = 'Bearer ' + token

  let res = await fetch(input, { ...init, headers })
  if (res.status !== 401) return res

  // Try refresh on 401
  const newToken = await refreshAccessToken()
  if (!newToken) return res

  headers['Authorization'] = 'Bearer ' + newToken
  res = await fetch(input, { ...init, headers })
  return res
}

