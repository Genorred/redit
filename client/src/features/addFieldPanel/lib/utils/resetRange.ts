export const useResetRange = (): (reactNode: Node | null) => void => {
    const resetRange = (reactNode: Node | null) => {
        const selection = document.getSelection()
        const range = new Range()
        if (reactNode)
            range.selectNodeContents(reactNode)
        range.collapse(false)
        if (selection) {
            selection.empty()
            selection.addRange(range)
        }
    }
    return resetRange
}