import React, { useEffect, useRef } from 'react'

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null)
  const isFirstRender = useRef(true)

  // Set the initial HTML once (uncontrolled after that) so the cursor
  // position isn't reset on every keystroke.
  useEffect(() => {
    if (editorRef.current && isFirstRender.current) {
      editorRef.current.innerHTML = value || ''
      isFirstRender.current = false
    }
  }, [value])

  function exec(command) {
    editorRef.current?.focus()
    document.execCommand(command)
    onChange(editorRef.current?.innerHTML ?? '')
  }

  function handleInput() {
    onChange(editorRef.current?.innerHTML ?? '')
  }

  function handleKeyDown(e) {
    const isMeta = e.metaKey || e.ctrlKey
    if (isMeta && e.key.toLowerCase() === 'b') {
      e.preventDefault()
      exec('bold')
    } else if (isMeta && e.key.toLowerCase() === 'u') {
      e.preventDefault()
      exec('underline')
    }
  }

  const isEmpty = !value || value === '<br>' || value === '<p></p>'

  return (
    <div className="rich-editor">
      <div className="rich-toolbar" role="toolbar" aria-label="Text formatting">
        <button
          type="button"
          className="rich-btn"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec('bold')}
          title="Bold (Ctrl/Cmd+B)"
          aria-label="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className="rich-btn"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec('underline')}
          title="Underline (Ctrl/Cmd+U)"
          aria-label="Underline"
        >
          <span style={{ textDecoration: 'underline' }}>U</span>
        </button>
        <span className="rich-divider" />
        <button
          type="button"
          className="rich-btn"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec('insertUnorderedList')}
          title="Bulleted list"
          aria-label="Bulleted list"
        >
          ≡
        </button>
        <button
          type="button"
          className="rich-btn"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec('insertOrderedList')}
          title="Numbered list"
          aria-label="Numbered list"
        >
          1.
        </button>
      </div>

      <div className="rich-editor-wrap">
        {isEmpty && <p className="rich-placeholder">{placeholder}</p>}
        <div
          ref={editorRef}
          className="rich-content"
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          aria-label={placeholder}
        />
      </div>
    </div>
  )
}
