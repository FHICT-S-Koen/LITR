import L, { Control, LatLngTuple } from 'leaflet'
import { useMap } from 'react-leaflet';
import { FC, useEffect } from 'react'

const buttonHtml =
	`<button id='button' class='leaflet-bar w-[34px] h-[34px] bg-white'>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 m-auto" viewBox="0 0 512 512">
		<path d="M8 190 184 39c16-13 40-3 40 18v80c161 1 288 33 288 185 0 62-40 123-83 154-14 10-33-2-28-18 45-145-22-184-177-186v88c0 21-24 31-40 18L8 227a25 25 0 0 1 0-37z"/>
		</svg>
	</button>`

const ResetControl: FC<L.ControlOptions> = (controlOptions) => {
	const map = useMap()

	useEffect(() => {
		const control = new Control(controlOptions)

		control.onAdd = () => {
			const div = L.DomUtil.create("div");
			div.innerHTML = buttonHtml
			return div;
		};

		map.addControl(control)

		control.getContainer()?.addEventListener("mousedown", L.DomEvent.stopPropagation)
		document.getElementById("button")?.addEventListener("click", handleClick)

		return () => {
			control.getContainer()?.removeEventListener("mousedown", L.DomEvent.stopPropagation)
			document.getElementById("button")?.removeEventListener("click", handleClick)
			map.removeControl(control)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map])

	const currentLocation: LatLngTuple = [51.433333, 5.483333] //TODO: Get Location of user
	const zoom = 14
	
	function handleClick() {
		map.setView(currentLocation, zoom)
	}

	return null
}

export default ResetControl