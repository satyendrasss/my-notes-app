// NOTE: This is a fully client-side demo auth system. There is no server,
// so "accounts" are just records in this browser's localStorage. The hash
// below only obscures the password from a casual glance at devtools — it is
// NOT cryptographically secure. Don't reuse a real password here, and don't
// ship this pattern to an app with real user data.

const USERS_KEY = 'ledger.auth.users.v1'
const SESSION_KEY = 'ledger.auth.session.v1'

function naiveHash(text) {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0
  }
  return `h${Math.abs(hash)}.${text.length}`
}

export function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getSession() {
  return localStorage.getItem(SESSION_KEY)
}

export function setSession(userId) {
  if (userId) {
    localStorage.setItem(SESSION_KEY, userId)
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function findUserById(id) {
  return loadUsers().find((u) => u.id === id) || null
}

export function registerUser({ name, email, password }) {
  const users = loadUsers()
  const normalizedEmail = email.trim().toLowerCase()

  if (!name.trim()) throw new Error('Enter your name.')
  if (!normalizedEmail) throw new Error('Enter an email address.')
  if (password.length < 6) throw new Error('Password must be at least 6 characters.')
  if (users.some((u) => u.email === normalizedEmail)) {
    throw new Error('An account with that email already exists.')
  }

  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: naiveHash(password),
    createdAt: Date.now(),
  }
  saveUsers([...users, user])
  return user
}

export function loginUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase()
  const user = loadUsers().find((u) => u.email === normalizedEmail)
  if (!user || user.passwordHash !== naiveHash(password)) {
    throw new Error('Incorrect email or password.')
  }
  return user
}
