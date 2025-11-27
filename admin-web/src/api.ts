export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) return null
  try {
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    })
    if (!res.ok) return null
    const body = await res.json()
    if (body.accessToken) localStorage.setItem('accessToken', body.accessToken)
    if (body.refreshToken) localStorage.setItem('refreshToken', body.refreshToken)
    return body.accessToken
  } catch (err) {
    console.error('refresh failed', err)
    return null
  }
}

export async function authFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const headers: any = init?.headers ? { ...(init.headers as any) } : {}
  const token = localStorage.getItem('accessToken')
  if (token) headers['Authorization'] = 'Bearer ' + token

  let res = await fetch(input, { ...init, headers })
  if (res.status !== 401) return res

  // try refresh
  const newToken = await refreshAccessToken()
  if (!newToken) return res

  headers['Authorization'] = 'Bearer ' + newToken
  res = await fetch(input, { ...init, headers })
  return res
}
