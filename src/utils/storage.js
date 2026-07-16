function storageKeyFor(userId) {
  return `ledger.notes.v1.${userId}`;
}

function storageKeyForTag(userId) {
  return `ledger.tags.v1.${userId}`;
}

export function loadNotes(userId) {
  try {
    const raw = localStorage.getItem(storageKeyFor(userId));

    if (!raw) {
      return [];
    }

    const notes = JSON.parse(raw);

    return Array.isArray(notes) ? notes : [];
  } catch (err) {
    console.error("Could not read notes from storage", err);
    return [];
  }
}

export function saveNotes(userId, notes) {
  try {
    localStorage.setItem(
      storageKeyFor(userId),
      JSON.stringify(notes)
    );
  } catch (err) {
    console.error("Could not save notes to storage", err);
  }
}

export function seedNotes() {
  return [];
}


// ==============================================================================
// TAG
// ==============================================================================
/*
[
  { id: 1, name: "Work", icon: "Briefcase" },
  { id: 2, name: "Personal", icon: "User" },
  { id: 3, name: "Important", icon: "Star" },
]
*/

export function saveTags(userId, tags) {
  try {
    localStorage.setItem(
      storageKeyForTag(userId),
      JSON.stringify(tags)
    );
  } catch (err) {
    console.error("Could not save tags to storage", err);
  }
}

export function loadTags(userId) {
  try {
    const raw = localStorage.getItem(storageKeyForTag(userId));
    if (!raw) {
      return [];
    }

    const tags = JSON.parse(raw);

    return Array.isArray(tags) ? tags : [];
  } catch (err) {
    console.error("Could not read tags from storage", err);
    return [];
  }
}