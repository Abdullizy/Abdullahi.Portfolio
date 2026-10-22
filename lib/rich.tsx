import * as React from 'react'

/** Turns "text *green italic* text" into text with <em> parts. */
export function rich(text: string): React.ReactNode {
  return text.split('*').map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : <React.Fragment key={i}>{part}</React.Fragment>))
}
