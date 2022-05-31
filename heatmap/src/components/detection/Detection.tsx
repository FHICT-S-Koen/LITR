import React, { createRef, FC } from "react"
import { Marker, Popup } from "react-leaflet"
import { drawBoundingBox } from "./draw"

interface DetectionProps {
	id: number
	objects: {
			id: number
			detection: DetectionProps
  			objectId: number
			xMin: number
			yMin: number
			xMax: number
			yMax: number
			confidence: number
			type: string
		}[]
	detectedAt: string
	lat: number
	lon: number
	picture: string
}

const Detection: FC<DetectionProps> = (props) => {
	const {id, objects, detectedAt,	lat, lon} = props

	const canvasRef = createRef<HTMLCanvasElement>()

	let boundingBox = true //INFO: using normal state since useState was closing the popup

	const toggleBoundingBoxes = async () => {
		const res = await fetch(`/api/detection/${id}`)
		const data = await res.json()
		if (!canvasRef.current) return
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')
		if (!context) return
		const image = new Image()
		image.onload = () => {
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
			if(boundingBox)
				drawBoundingBox(canvas, props)
			boundingBox = !boundingBox
		}
		image.src = 'data:image/png;base64,' + data.picture
	}

	const handlePopupopen = async () => {
		const res = await fetch(`/api/detection/${id}`)
		const data = await res.json()
		if (!canvasRef.current) return
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')
		if (!context) return
		const image = new Image()
		image.onload = () => {
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
		}
		image.src = 'data:image/png;base64,' + data.picture
	}

	return <Marker position={[lat, lon]} eventHandlers={{popupopen: handlePopupopen}}>
		<Popup>
			<canvas 
				ref={canvasRef}
				className="w-full h-full rounded-t-[5px] outline outline-1" />
			<button 
				onClick={toggleBoundingBoxes}
				className="w-full font-bold py-2 mt-0.5 shadow hover:shadow-md">
				show bounding box
			</button>
			<div className="p-2 rounded-b-[5px] text-base">
				Detected at: {detectedAt}
				<div className="leading-6 text-gray-700 my-2">
					Types of litter: {objects.map(e => e.type)} <br></br>
					Number of detected objects: {objects.length}
				</div>
				Latitude: {lat} Longitude: {lon}
			</div>
		</Popup>
	</Marker>
}

export { Detection as default, type DetectionProps }