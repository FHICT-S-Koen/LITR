import L, { Control } from 'leaflet'
import { useMap } from 'react-leaflet';
import { createControlComponent } from '@react-leaflet/core';

const ResetControl = createControlComponent(controlOptions => {
  const control = new Control(controlOptions)
	const html =
    `<button id='button' class='leaflet-bar w-[34px] h-[34px] bg-white'>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 m-auto" viewBox="0 0 512 512">
      <path d="M8 190 184 39c16-13 40-3 40 18v80c161 1 288 33 288 185 0 62-40 123-83 154-14 10-33-2-28-18 45-145-22-184-177-186v88c0 21-24 31-40 18L8 227a25 25 0 0 1 0-37z"/>
      </svg>
    </button>`

  control.onAdd = () => {
    const div = L.DomUtil.create("div");
    div.innerHTML = html

    L.DomEvent.disableClickPropagation(div)
    div.addEventListener("click", handleClick)

    return div;
  };

  const map = useMap()
  
	const handleClick = () => {
    navigator.geolocation.getCurrentPosition(function(position) {    
		map.setView([position.coords.latitude,  position.coords.longitude],20) //TODO: Get Location of user
    })
  }
  
	return control
})

export default ResetControl