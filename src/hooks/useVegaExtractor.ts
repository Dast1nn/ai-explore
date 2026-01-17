import { useEffect, useState } from 'react'

export function useVegaExtractor(text: string) {
	const [spec, setSpec] = useState<any | null>(null)
	const [error, setError] = useState<string | null>(null)
	useEffect(() => {
		const match = text.match(/```json([\s\S]*?)```/)

		if (!match) return

		try {
			const parsed = JSON.parse(match[1])

			if (!parsed.mark || !parsed.encoding) {
				throw new Error('Invalid Vega spec')
			}

			setSpec(parsed)
			setError(null)
		} catch (e: any) {
			setError(e.message)
		}
	}, [text])
	return { spec, error }
}
