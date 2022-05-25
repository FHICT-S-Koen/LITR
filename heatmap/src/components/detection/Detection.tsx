import React, { createRef, FC, useEffect } from "react"
import { useState } from "react"
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
	const [picture, setPicture] = useState<string>()
	const [showBoxes, setShowBoxes] = useState(false)

	useEffect(() => {
		if (!canvasRef.current) return
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')
		if (!context || !picture) return
		const image = new Image()
		image.onload = () => {
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
			if (showBoxes)
				drawBoundingBox(canvas, props)
		}
		image.src = picture
	}, [picture, showBoxes])

	const toggleBoundingBoxes = () => setShowBoxes(!showBoxes)

	const handlePopupopen = async () => {
		const res = await fetch(`/api/detection/${id}`)
		const data = await res.json()
		setPicture('data:image/png;base64,' + data.picture)
	}

	return <Marker position={[lat, lon]} eventHandlers={{popupopen: handlePopupopen}}>
		<Popup>
			<canvas className="w-full h-full rounded-t-[5px] outline outline-1" ref={canvasRef} />
			<button className="w-full font-bold py-2 mt-0.5 shadow hover:shadow-md" onClick={toggleBoundingBoxes}>show bounding box</button>
			<div className="p-2 font-bold text-lg">
				Details
			</div>
			<div className="p-2 rounded-b-[5px] text-base">Detected at: {detectedAt}
				<div className="leading-6 text-gray-700 my-2">
					Types of litter: {objects.map(e => e.type)} <br></br>
					Number of detected objects: {objects.length}
				</div>
				<div className="paragraph-normal text-gray-600">
					Latitude: {lat} Longitute: {lon}
				</div>
			</div>
		</Popup>
	</Marker>
}

export { Detection as default, type DetectionProps }