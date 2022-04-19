type DetectionProps = {
	id: number
	objects: number
	types: string
	lat: number
	lon: number
	picture: string
}

const Detection = (props: DetectionProps) => {

	return <div className="bg-black text-white rounded p-2">{props.id}</div>
}

export type { DetectionProps }
export default Detection