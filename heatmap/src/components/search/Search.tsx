import { useEffect } from 'react'
import L, { Control, LatLngTuple } from 'leaflet'
import options from './data/options.json'
import { useMap } from 'react-leaflet';

const searchHtml = () =>
  [
    "<input id='search' autocomplete='off' list='municipalities' placeholder='Enter Location' class='fixed -translate-x-1/2 left-1/2 mt-2 px-3 py-1.5 text-gray-700 border border-gray-300 rounded focus:border-blue-600 outline-none' />",
    `<datalist id="municipalities">
      ${options.map(m => `<option value='${m.name}'>${m.name}</option>`)}
    </datalist>`
  ].join("\n");

const Search = () => {
  const map = useMap()

  useEffect(() => {
    const control = new Control()

    control.onAdd = () => {
      const div = L.DomUtil.create("div");
      div.innerHTML = searchHtml()
      return div;
    };

    map.addControl(control)

    control.getContainer()?.addEventListener("mousedown", L.DomEvent.stopPropagation)
    document.getElementById("search")?.addEventListener("keyup", handleChange)

    return () => {
      control.getContainer()?.removeEventListener("mousedown", L.DomEvent.stopPropagation)
      document.getElementById("search")?.removeEventListener("keyup", handleChange)
      map.removeControl(control)
    }
  }, [map])

  function handleChange(e: any) {
    const object= options.find(o => o.name.toLowerCase() == e.target.value.toLowerCase())
    if (object != null)
      map.setView(object.coords as LatLngTuple, 14)
  }

  return null
}

export default Search