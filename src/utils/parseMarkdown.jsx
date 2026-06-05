export const parseMarkdown = (text) => {
    if (!text) return text

    const parts = []
    let lastIndex = 0

    const regex = /\*\*(.+?)\*\*|\*(.+?)\*|\n/g
    let match

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index))
        }

        if (match[0] === '\n') {
            parts.push(<br key={parts.length} />)
        } else if (match[1]) {
            parts.push(<strong key={parts.length}>{match[1]}</strong>)
        } else if (match[2]) {
            parts.push(<em key={parts.length}>{match[2]}</em>)
        }

        lastIndex = regex.lastIndex
    }

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex))
    }

    return parts.length === 0 ? text : parts
}
