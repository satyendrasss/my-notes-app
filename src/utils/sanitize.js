// Minimal sanitizer for locally-authored rich text (bold/underline/italic/lists).
// This app has no server and no shared/multi-user content — notes are only
// ever written by the same browser that reads them — but we still strip
// script tags and inline event handlers/URLs as a baseline precaution.

const ALLOWED_TAGS = new Set([
  'P', 'BR', 'STRONG', 'B', 'EM', 'I', 'U', 'UL', 'OL', 'LI', 'DIV', 'SPAN',
])

export function sanitizeHtml(html) {
  const template = document.createElement('template')
  template.innerHTML = html || ''

  const walk = (node) => {
    ;[...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        if (!ALLOWED_TAGS.has(child.tagName)) {
          child.replaceWith(...child.childNodes)
          return
        }
        ;[...child.attributes].forEach((attr) => {
          child.removeAttribute(attr.name)
        })
        walk(child)
      }
    })
  }

  walk(template.content)
  return template.innerHTML
}

export function htmlToPlainText(html) {
  const template = document.createElement('template')
  template.innerHTML = html || ''
  return (template.content.textContent || '').replace(/\s+/g, ' ').trim()
}
