'use client'

import { Status, StreamEvent } from '@/types/streams.types'
import { useRef, useState } from 'react'

export function useSSE() {
	const [status, setStatus] = useState<Status>('idle')
	const [speed, setSpeed] = useState<number>(1)
	const timer = useRef<number | null>(null)
	const stopped = useRef(false)
	const cursorRef = useRef(0)
	function play(events: StreamEvent[], onEvent: (e: StreamEvent) => void) {
		if (!events.length) return
		setStatus('streaming')
		stopped.current = false
		const tick = () => {
			if (stopped.current) return

			if (cursorRef.current >= events.length) {
				setStatus('done')
				return
			}

			const ev = events[cursorRef.current++]
			onEvent(ev)

			if (ev.event === 'done') {
				setStatus('done')
				return
			}

			const delay = (50 + Math.random() * 100) / speed

			timer.current = window.setTimeout(tick, delay)
		}
		tick()
	}
	function stop() {
		stopped.current = true
		if (timer.current) clearTimeout(timer.current)
		setStatus('idle')
	}
	function reset() {
		stopped.current = true
		clearTimer()
		cursorRef.current = 0 // 👈 сброс позиции
		setStatus('idle')
	}
	function clearTimer() {
		if (timer.current) {
			clearTimeout(timer.current)
			timer.current = null
		}
	}
	return { play, stop, status, speed, setSpeed, reset }
}
