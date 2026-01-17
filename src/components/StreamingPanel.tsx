'use client'

import { useVegaExtractor } from '@/hooks/useVegaExtractor'
import { CopyVegaButton } from './CopyVegaSpec'
import { StreamingOutput } from './StreamingOutput'
import { VegaPreview } from './VegaPreview'

type Props = {
	text: string
}

export function StreamingPanel({ text }: Props) {
	const { spec, error } = useVegaExtractor(text)
	return (
		<section className='space-y-4'>
			<h3 className='flex items-center gap-3'>
				Streaming output
				<CopyVegaButton text={text} />
			</h3>
			<StreamingOutput text={text} />
			<h3>Vega chart preview</h3>
			{error && <div className='text-red-500'>{error}</div>}
			<VegaPreview spec={spec} />
		</section>
	)
}
