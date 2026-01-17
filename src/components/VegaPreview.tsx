'use client'

import { useEffect, useRef } from 'react'
import type { VisualizationSpec } from 'vega-embed'
import embed from 'vega-embed'
export function VegaPreview({ spec }: { spec: VisualizationSpec }) {
	const ref = useRef<HTMLDivElement>(null)
	const data = [
		{ region: 'Almaty', revenue: 120 },
		{ region: 'Astana', revenue: 90 },
		{ region: 'Shymkent', revenue: 70 },
	]

	useEffect(() => {
		if (!spec || !ref.current) return

		embed(ref.current, {
			$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
			...spec,
			width: 500,
			height: 300,
			data: { values: data },
		} as VisualizationSpec).catch(console.error)
	}, [spec])

	return <div ref={ref} />
}
