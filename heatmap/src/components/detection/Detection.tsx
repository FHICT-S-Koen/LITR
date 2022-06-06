import React, { createRef, FC } from "react"
import { Marker, Popup, useMap} from "react-leaflet"
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
	detectedAt: number
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
	const map = useMap()

	const handlePopupclose = () =>
		map.closePopup()

	return <Marker position={[lat, lon]} eventHandlers={{popupopen: handlePopupopen}}>
		<Popup>
			<canvas 
				ref={canvasRef}
				className="w-full h-full rounded-t-[15px] " />	
			<button onClick={handlePopupclose} className="absolute top-4 left-4 text-white text-center bg-[#00000066] rounded-full p-[6px]">
				<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="block h-3 w-3 stroke-white stroke-[4px] overflow: visible;" aria-hidden="true" role="presentation" focusable="false"><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
			</button>
			<button 
				onClick={toggleBoundingBoxes}
				className="w-full font-bold py-2 mt-0.5 shadow hover:shadow-md">
				show bounding box
			</button>
			<div className="p-2 rounded-b-[15px] text-base">
				{detectedAt}
				<div className="leading-6 text-gray-700 my-2">
					Types of litter: {objects.map(e => e.type)} <br></br>
					Number of detected objects: {objects.length}
				</div>
			</div>
		</Popup>
	</Marker>
}

export { Detection as default, type DetectionProps }