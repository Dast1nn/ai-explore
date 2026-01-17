// components/Controls.tsx
'use client'

type Props = {
	status: string
	speed: number
	onPlay: () => void
	onPause: () => void
	onReset: () => void
	onSpeedChange: (v: number) => void
}

const speeds = [0.25, 0.5, 1, 2]

export function Controls({
	status,
	speed,
	onPlay,
	onPause,
	onReset,
	onSpeedChange,
}: Props) {
	return (
		<div className='flex items-center gap-4 '>
			{status === 'streaming' ? (
				<button
					className='px-4 py-2 bg-red-500 text-white rounded cursor-pointer'
					onClick={onPause}
				>
					Pause
				</button>
			) : (
				<button
					className='px-4 py-2 bg-green-500 text-white rounded cursor-pointer'
					onClick={onPlay}
				>
					Play
				</button>
			)}
			<button onClick={onReset} className='cursor-pointer'>
				Reset
			</button>
			<div className='flex items-center gap-2'>
				<span>Speed:</span>
				{speeds.map(s => (
					<button
						key={s}
						onClick={() => onSpeedChange(s)}
						className={`px-2 py-1 rounded ${
							speed === s ? 'bg-cyan-600 text-white' : 'bg-black border'
						}`}
					>
						{s}x
					</button>
				))}
			</div>
		</div>
	)
}
