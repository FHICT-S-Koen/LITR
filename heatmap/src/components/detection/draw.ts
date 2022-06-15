import { DetectionProps } from "./Detection";

function drawBoundingBox(canvas: HTMLCanvasElement, props: DetectionProps) {
	const context = canvas.getContext('2d')
	if (!context) return
	context.beginPath()
	props.objects.map(o => {
		context.strokeStyle = "red"
		context.fillStyle = "red"
		context.font = "24px sans"
		context.lineWidth = 5
		const labelText = o.type + " " + Math.round(o.confidence * 100) + "%"
		if (o.yMin > 28){
			context.fillRect(o.xMin-2, o.yMin - 32, context.measureText(labelText).width + 4, 30)
			context.fillStyle = "white"
			context.fillText(labelText, o.xMin, o.yMin - 8)
		}		
		else {
			context.fillRect(o.xMin, o.yMax - 29, context.measureText(labelText).width, 30)
			context.fillStyle = "white"
			context.fillText(labelText, o.xMin, o.yMax - 9)
		}

		context.rect(o.xMin, o.yMin, o.xMax - o.xMin, o.yMax - o.yMin)
	})
	context.stroke()
}

export { drawBoundingBox }