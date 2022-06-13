import L, { Control } from 'leaflet'
import { useMap } from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'
import { useState } from 'react'

const SliderControl = createControlComponent(controlOptions => {
      const control = new Control(controlOptions)
      const html = 
      `<div class='leaflet-bar bg-white -translate-x-1/2 ml-[18px] rotate-90 mt-[63px] p-1  h-[33px]  rounded'><input type='range' min='1' max='5' step='1' class='leaflet-bar slider'/></div>`

      control.onAdd = () => {
            const div = L.DomUtil.create("div", "");
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