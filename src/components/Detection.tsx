interface DetectionProps {
	id: number
	detectedAt: string
	objects: number
	types: string
	lat: number
	lon: number
	picture: string
}

const Detection = (props: DetectionProps) => {

	return <div className="bg-white rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden">
		<img className="h-56 lg:h-60 w-56 object-fill" src={props.picture} alt="" />
		<div className="p-3">
			<span className="text-sm text-primary">Detected on: {props.detectedAt}</span>
			<h3 className="font-semibold text-xl leading-6 text-gray-700 my-2">
				Types of litter: {props.types} <br></br>
				Number of detected objects: {props.objects}
			</h3>
			<p className="paragraph-normal text-gray-600">
				Latitude: {props.lat} Longitute: {props.lon}
			</p>
		</div>
	</div>
}

export type { DetectionProps }
export default Detection