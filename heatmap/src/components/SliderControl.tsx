import L, { Control } from 'leaflet'
import { useMap } from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'
import { useState } from 'react'

const SliderControl = createControlComponent(controlOptions => {
      const control = new Control(controlOptions)
      const html = 
      `<input type='range' min='1' max='5' step='1' class='leaflet-bar slider'/>`

      control.onAdd = () => {
            const div = L.DomUtil.create("div", "bg-white p-1 rounded");
            div.innerHTML = html

            L.DomEvent.disableClickPropagation(div)
            div.addEventListener("input", handleChange) 
            return div;
      };

      const map = useMap()

      function handleChange(e: Event) {
            const target = e.target as HTMLInputElement;
            console.log(target.value)
            //Today
            
            //Three days

            //One week

            //All
      }

      return control

      })
  
export default SliderControl