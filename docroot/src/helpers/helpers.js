import React from 'react'
import escapeHtml from 'escape-html';
import parse from 'html-react-parser'
import { Text, Node } from 'slate'
import { Link, Paragraph } from 'theme-ui'

export const serialize = node => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }

    if (node.underline) {
      string = `<u>${string}</u>`
    }

    if (node.italic) {
      string = `<em>${string}</em>`
    }

    if (node.code) {
      string = `<code><pre>${string}</pre></code>`
    }
    return string
  }

  const children = parse(node.children?.map(n => serialize(n)).join(''))

  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`
    case 'paragraph':
      return (
        <Paragraph key=''>{children}</Paragraph>
      )
    case 'link':
      return (
        <Link href={escapeHtml(node.url)}>{children}</Link>
      )
    default:
      return children
  }
}

export const plainText = nodes => {
  return Node.string(nodes)
}
