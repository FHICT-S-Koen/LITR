import L, { Control } from 'leaflet'
import { useMap } from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'

const SliderControl = createControlComponent(controlOptions => {
    const control = new Control(controlOptions)
    const html = 
    `<input type='range' min='1' max='10' class='leaflet-bar slider' />`
    
    control.onAdd = () => {
      const div = L.DomUtil.create("div", "z-0");
      div.innerHTML = html
  
      div.addEventListener("mousedown", L.DomEvent.stopPropagation)
      div.addEventListener("keyup", handleChange)
  
      return div;
    };
  
    const map = useMap()
  
    function handleChange(e: KeyboardEvent) {
        const target = e.target as HTMLInputElement;
    }
  
    return control
  })
  
  export default SliderControl