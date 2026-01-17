export function extractVegaSpec(text: string): string | null {
	const match = text.match(/```json([\s\S]*?)```/)
	if (!match) return null
	return match[1].trim()
}
