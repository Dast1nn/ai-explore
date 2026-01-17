'use client'

import { extractVegaSpec } from '@/utils/extractVegaSpec'
import { useState } from 'react'

export function CopyVegaButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false)

	async function copy() {
		const json = extractVegaSpec(text)
		if (!json) return

		await navigator.clipboard.writeText(json)
		setCopied(true)

		setTimeout(() => setCopied(false), 1500)
	}

	return (
		<button
			onClick={copy}
			disabled={!extractVegaSpec(text)}
			className='px-3 py-1 border rounded bg-black disabled:opacity-50 text-white'
		>
			{copied ? 'Copied!' : 'Copy Vega spec'}
		</button>
	)
}
