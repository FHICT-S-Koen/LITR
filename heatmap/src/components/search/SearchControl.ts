import L, { Control, LatLngTuple } from 'leaflet'
import options from './data/options.json'
import { useMap } from 'react-leaflet';
import { createControlComponent } from '@react-leaflet/core';
  
const SearchControl = createControlComponent(controlOptions => {
  const control = new Control(controlOptions)
  const html = [
    "<input id='search' autocomplete='off' list='municipalities' placeholder='Enter Location' class='leaflet-bar fixed text-base top-0 -translate-x-1/2 left-1/2 mt-2 px-3 py-1.5 text-gray-700 border border-gray-300 rounded focus:border-blue-600 outline-none' />",
    `<datalist id="municipalities">
      ${options.map(m => `<option value='${m.name}'>${m.name}</option>`)}
    </datalist>`
  ].join("\n");

  control.onAdd = () => {
    const div = L.DomUtil.create("div", "z-0");
    div.innerHTML = html

    L.DomEvent.disableClickPropagation(div)
    div.addEventListener("keyup", handleChange)

    return div;
  };

  const map = useMap()

  function handleChange(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    const object = options.find(o => o.name.toLowerCase() == target.value.toLowerCase())
    if (object != null)
      map.setView(object.coords as LatLngTuple, 14)
  }

  return control
})

export default SearchControl