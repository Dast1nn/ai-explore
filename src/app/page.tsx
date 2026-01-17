'use client'

import { Controls } from '@/components/Controls'
import { StreamingPanel } from '@/components/StreamingPanel'
import { useSSE } from '@/hooks/useSSE'
import { StreamEvent } from '@/types/streams.types'
import { parseJson } from '@/utils/parseJson'
import { useState } from 'react'

export default function Page() {
	const [events, setEvents] = useState<StreamEvent[]>([])
	const [text, setText] = useState('')

	const { play, stop, status, speed, setSpeed, reset } = useSSE()

	function loadFile(file: File) {
		file.text().then(t => {
			setText('')
			setEvents(parseJson(t))
		})
	}

	return (
		<main className='p-6 space-y-4'>
			<input
				className='border rounded p-2 '
				type='file'
				accept='.jsonl'
				onChange={e => e.target.files && loadFile(e.target.files[0])}
			/>

			<Controls
				status={status}
				speed={speed}
				onPlay={() =>
					play(events, ev => {
						if (ev.event === 'token') {
							setText(t => t + ev.data.delta)
						}
					})
				}
				onReset={() => {
					reset()
					setText('')
				}}
				onPause={stop}
				onSpeedChange={setSpeed}
			/>

			<div>Status: {status}</div>

			<StreamingPanel text={text} />
		</main>
	)
}
