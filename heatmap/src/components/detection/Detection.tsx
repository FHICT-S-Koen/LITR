import { LeafletMouseEvent } from "leaflet"
import React, { FC, useContext, useEffect } from "react"
import { useRef, useState } from "react"
import { Marker, Popup } from "react-leaflet"
import { Context } from "../../pages/Store"
import { drawBoundingBox, drawImage } from "./draw"

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

	const [showBoxes, _setShowBoxes] = useState(false)
	const showBoxesRef = useRef(showBoxes)
	const setShowBoxes = (val: boolean) => {
		showBoxesRef.current = val
		_setShowBoxes(val)
	}

	const onClick = () => {
		setLoading(true)
		fetch(`/api/detection/${id}`)
		  	.then(res => res.json())
			.then((data) => {
				store.dispatch({type: "setPicture", payload: data.picture}),
				setLoading(false)
				console.log("width, height")
				if (!canvasRef.current) return
				drawImage(canvasRef.current, data.picture)
			})
	}

	const toggleBoundingBoxes = () => {
		if (!store.state.picture || !canvasRef.current) return
		drawImage(canvasRef.current, store.state.picture)
		if (showBoxes) {
			drawBoundingBox(canvasRef.current, props)
		 	setShowBoxes(false)
		}
		else setShowBoxes(true)
	}

	// const image = newImage()	

	return <Marker position={[lat, lon]} eventHandlers={{click: onClick}}>
		<Popup>
			{!isLoading && <canvas className="w-full h-full" ref={canvasRef}></canvas>}
			{/* <svg>
				{store.state.picture && <image xlinkHref={'data:image/png;base64,' + store.state.picture} width={('data:image/png;base64,' + store.state.picture).src} height={}></image>}
			</svg> */}
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