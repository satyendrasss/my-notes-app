import { useEffect, useState, useCallback, useMemo } from 'react'
import { loadNotes, saveNotes, seedNotes } from '../utils/storage'

export function useNotes(userId) {
  const [notes, setNotes] = useState(() => {
    if (!userId) return []
    return loadNotes(userId) ?? seedNotes()
  })

  // Reload when the logged-in user changes (e.g. after login/logout).
  useEffect(() => {
    if (!userId) {
      setNotes([])
      return
    }
    setNotes(loadNotes(userId) ?? seedNotes())
  }, [userId])

  useEffect(() => {
    if (!userId) return
    saveNotes(userId, notes)
  }, [userId, notes])

  const addNote = useCallback((data) => {
    const now = Date.now()
    const note = {
      id: crypto.randomUUID(),
      title: data.title?.trim() || 'Untitled',
      body: data.body ?? '',
      category: data.category?.trim() || 'General',
      color: data.color || 'parchment',
      favorite: false,
      createdAt: now,
      updatedAt: now,
    }
    setNotes((prev) => [note, ...prev])
    return note.id
  }, [])

  const updateNote = useCallback((id, data) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, ...data, updatedAt: Date.now() }
          : n
      )
    )
  }, [])

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const toggleFavorite = useCallback((id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, favorite: !n.favorite } : n))
    )
  }, [])

  const categories = useMemo(() => {
    const set = new Set(notes.map((n) => n.category || 'General'))
    return Array.from(set).sort()
  }, [notes])

  return { notes, addNote, updateNote, deleteNote, toggleFavorite, categories }
}
