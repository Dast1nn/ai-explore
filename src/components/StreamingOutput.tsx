'use client'

import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import { useEffect, useMemo } from 'react'

type Props = {
	text: string
}

export function StreamingOutput({ text }: Props) {
	const parts = useMemo(() => {
		const regex = /```json([\s\S]*?)```/g
		const result: { type: 'text' | 'json'; value: string }[] = []

		let lastIndex = 0
		let match

		while ((match = regex.exec(text))) {
			if (match.index > lastIndex) {
				result.push({
					type: 'text',
					value: text.slice(lastIndex, match.index),
				})
			}

			result.push({
				type: 'json',
				value: match[1].trim(),
			})

			lastIndex = regex.lastIndex
		}

		if (lastIndex < text.length) {
			result.push({
				type: 'text',
				value: text.slice(lastIndex),
			})
		}

		return result
	}, [text])

	useEffect(() => {
		Prism.highlightAll()
	}, [parts])

	return (
		<div className='border rounded p-3 whitespace-pre-wrap bg-black'>
			{parts.map((p, i) =>
				p.type === 'text' ? (
					<span key={i}>{p.value}</span>
				) : (
					<pre
						key={i}
						className='language-json rounded p-2 bg-gray-900 text-white'
					>
						<code className='language-json'>{p.value}</code>
					</pre>
				)
			)}
		</div>
	)
}
