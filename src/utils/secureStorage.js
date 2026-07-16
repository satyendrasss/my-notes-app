// storage.js

const DB_NAME = "LedgerDB";
const DB_VERSION = 1;

const NOTES_STORE = "notes";
const TAGS_STORE = "tags";

// -----------------------------------------------------------------------------
// IndexedDB
// -----------------------------------------------------------------------------

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(NOTES_STORE)) {
        db.createObjectStore(NOTES_STORE);
      }

      if (!db.objectStoreNames.contains(TAGS_STORE)) {
        db.createObjectStore(TAGS_STORE);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function put(storeName, key, value) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");

    tx.objectStore(storeName).put(value, key);

    tx.oncomplete = () => resolve();

    tx.onerror = () => reject(tx.error);
  });
}

async function get(storeName, key) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");

    const req = tx.objectStore(storeName).get(key);

    req.onsuccess = () => resolve(req.result);

    req.onerror = () => reject(req.error);
  });
}

// -----------------------------------------------------------------------------
// Encryption (AES-GCM)
// -----------------------------------------------------------------------------

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function deriveKey(secret) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("ledger-salt-v1"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encrypt(data, secret) {
  const key = await deriveKey(secret);

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encoder.encode(JSON.stringify(data))
  );

  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
  };
}

async function decrypt(payload, secret) {
  if (!payload) return [];

  const key = await deriveKey(secret);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(payload.iv),
    },
    key,
    new Uint8Array(payload.data)
  );

  return JSON.parse(decoder.decode(decrypted));
}

// -----------------------------------------------------------------------------
// Notes
// -----------------------------------------------------------------------------

function notesKey(userId) {
  return `notes:${userId}`;
}

export async function saveNotes(userId, notes, secret) {
  try {
    const encrypted = await encrypt(notes, secret);

    await put(NOTES_STORE, notesKey(userId), encrypted);
  } catch (err) {
    console.error(err);
  }
}

export async function loadNotes(userId, secret) {
  try {
    const encrypted = await get(NOTES_STORE, notesKey(userId));

    if (!encrypted) return [];

    return await decrypt(encrypted, secret);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export function seedNotes() {
  return [];
}

// -----------------------------------------------------------------------------
// Tags
// -----------------------------------------------------------------------------

function tagsKey(userId) {
  return `tags:${userId}`;
}

export async function saveTags(userId, tags, secret) {
  try {
    const encrypted = await encrypt(tags, secret);

    await put(TAGS_STORE, tagsKey(userId), encrypted);
  } catch (err) {
    console.error(err);
  }
}

export async function loadTags(userId, secret) {
  try {
    const encrypted = await get(TAGS_STORE, tagsKey(userId));

    if (!encrypted) return [];

    return await decrypt(encrypted, secret);
  } catch (err) {
    console.error(err);
    return [];
  }
}



// Usage
/*
const secret = "user-password-or-auth-token";

// Save
await saveNotes(user.id, notes, secret);
await saveTags(user.id, tags, secret);

// Load
const notes = await loadNotes(user.id, secret);
const tags = await loadTags(user.id, secret);

*/