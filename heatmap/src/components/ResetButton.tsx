import L, { Control, LatLngTuple } from 'leaflet'
import { useMap } from 'react-leaflet';
import { useEffect } from 'react'

const buttonHtml =
	"<button id='button' class='px-3 py-1.5 text-white border border-gray-300 rounded focus:border-blue-600 bg-blue-400 outline-none'>reset</button>"

const ResetButton = () => {
	const map = useMap()

	useEffect(() => {
		const control = new Control()

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

	const currentLocation: LatLngTuple = [51.433333, 5.483333] // Get Location of user
	const zoom = 14
	
	function handleClick() {
		map.setView(currentLocation, zoom)
	}

	return null
}

export default ResetButton