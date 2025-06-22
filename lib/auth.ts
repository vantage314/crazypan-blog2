export const AUTH_TOKEN_KEY = "crazypan_admin_token"

export const mockUser = {
  username: "admin",
  password: "123456",
}

export function login(username: string, password: string): boolean {
  if (username === mockUser.username && password === mockUser.password) {
    const token = "mock_jwt_token_" + Date.now()
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem(AUTH_TOKEN_KEY)
}

export function requireAuth(): boolean {
  if (!isAuthenticated()) {
    window.location.href = "/admin"
    return false
  }
  return true
}
