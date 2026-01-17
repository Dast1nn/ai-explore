import { StreamEvent } from '@/types/streams.types'

export function parseJson(text: string): StreamEvent[] {
	return text
		.split('\n')
		.map(line => line.trim())
		.filter(Boolean)
		.map(line => JSON.parse(line))
}
