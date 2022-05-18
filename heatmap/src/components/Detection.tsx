import React, { FC, useContext } from "react"
import { useRef, useState } from "react"
import { Marker, Popup } from "react-leaflet"
import { Context } from "../pages/Store"

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
	const {id, objects, detectedAt,	lat, lon, picture} = props

	const canvasRef = React.createRef<HTMLCanvasElement>();
	
	const [showBoxes, _setShowBoxes] = useState(false)
	const showBoxesRef = useRef(showBoxes)
	const setShowBoxes = (val: boolean) => {
		showBoxesRef.current = val
		_setShowBoxes(val)
	}
	const store = useContext(Context)

	const onClick = () => {
		fetch(`/api/detection/${id}`)
		  	.then(res => res.json())
			.then((data) => 
				store.dispatch({type: "setPicture", payload: data.picture}),
			)
		if (!store.state.picture) return
		if (!canvasRef.current) return
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')
		if (!context) return

		const image = new Image()
		image.src = 'data:image/png;base64,' + store.state.picture
		context.drawImage(image, 0, 0)

		if (!showBoxesRef.current) return
		context.beginPath()
		props.objects.map(o => {
			context.strokeStyle = "red"
			context.fillStyle = "red"
			context.font = "24px arial-mono"
			context.lineWidth = 5
			const labelText = o.type + " " + Math.round(o.confidence * 100) + "%"
			context.fillRect(o.xMin, o.yMin - 28, context.measureText(labelText).width, 30)
			context.fillStyle = "white"
			context.fillText(labelText, o.xMin, o.yMin - 8)
			context.rect(o.xMin, o.yMin, o.xMax - o.xMin, o.yMax - o.yMin)
		})
		context.stroke()
	}

	return <Marker position={[lat, lon]} eventHandlers={{click: onClick}}>
		<Popup>
			<canvas className="w-full h-full" width={500} height={500} ref={canvasRef}></canvas>
			<button onClick={() => {setShowBoxes(!showBoxes), onClick()}}>show</button>
			<div className="p-3">
				<span className="text-sm text-primary">Detected at: {detectedAt}</span>
				<h3 className="font-semibold text-xl leading-6 text-gray-700 my-2">
					Types of litter: {objects.map(e => e.type)} <br></br>
					Number of detected objects: {objects.length}
				</h3>
				<p className="paragraph-normal text-gray-600">
					Latitude: {lat} Longitute: {lon}
				</p>
			</div>
		</Popup>
	</Marker>
}

export { Detection as default, type DetectionProps }