import React, { FC, useContext, useEffect } from "react"
import { useRef, useState } from "react"
import { Marker, Popup } from "react-leaflet"
import { Context } from "../../pages/Store"
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
	const store = useContext(Context)

	const canvasRef = React.createRef<HTMLCanvasElement>();
	
	const [isLoading, setLoading] = useState(false)
	const [showBoxes, setShowBoxes] = useState(false)
	const [{ width, height }, setSize] = useState({ width: 0, height: 0 })

	useEffect(() => {
		if (!canvasRef.current || !store.state.picture) return
		if (!isLoading) {
			const context = canvasRef.current.getContext('2d')
			if (!context) return
			
			const image = new Image()
			image.src = 'data:image/png;base64,' + store.state.picture
			
			const width = image.width
			const height = image.height
			
			canvasRef.current.width = width
			canvasRef.current.height = height
			
			setSize({width, height})
			context.drawImage(image, 0, 0, width, height)
		}
		if (showBoxes)
			drawBoundingBox(canvasRef.current, props)
	}, [canvasRef, isLoading, props, showBoxes, store.state.picture])

	const onClick = () => {
		setLoading(true)
		fetch(`/api/detection/${id}`)
		  	.then(res => res.json())
			.then((data) => {
				store.dispatch({type: "setPicture", payload: data.picture}),
				setLoading(false)
			})
	}

	const toggleBoundingBoxes = () => setShowBoxes(!showBoxes)

	return <Marker position={[lat, lon]} eventHandlers={{click: onClick}}>
		<Popup>
			{!isLoading && <canvas className="w-full h-full" ref={canvasRef} width={width} height={height}></canvas>}
			<button className="w-full bg-slate-300 my-0.5 border border-black" onClick={toggleBoundingBoxes}>show bounding box</button>
			<div className="font-bold text-lg">
				Details
			</div>
			<div className="">Detected at: {detectedAt}</div>
				<div className="leading-6 text-gray-700 my-2">
					Types of litter: {objects.map(e => e.type)} <br></br>
					Number of detected objects: {objects.length}
				</div>
				<div className="paragraph-normal text-gray-600">
					Latitude: {lat} Longitute: {lon}
				</div>
		</Popup>
	</Marker>
}

export { Detection as default, type DetectionProps }