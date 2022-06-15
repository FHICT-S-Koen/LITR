import L, { Control, ControlPosition } from 'leaflet'
import { useMap } from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'
import { FC, useState, useEffect } from 'react'

const SliderControl:FC<{ position:ControlPosition, setFilter: (value:number) => void }> = ({position, setFilter}) => {
      const map = useMap()
      
      const html = 
      `
      <div id='slider-tooltip' class='ml-9 -mt-[18px] absolute top-5 leaflet-bar'>
            <p id='slider-tooltip-text' class='bg-white rounded p-[5px]'>Today</p>
      </div>
      <div class='leaflet-bar bg-white -translate-x-1/2 ml-[17px] rotate-90 mt-[63px] py-[7px] px-1 h-[34px] rounded'>
            <input type='range' min='1' max='4' step='1' value='1' class='leaflet-bar slider'/>
            
      </div>
      `
      
      useEffect(() => {
            const control = new Control({position})
            control.onAdd = () => {
                  const div = L.DomUtil.create("div", "relative");
                  div.innerHTML = html      
                  L.DomEvent.disableClickPropagation(div)                  
                  return div;
            };
            map.addControl(control)
            control.getContainer()?.addEventListener("input", handleChange) 

            return () => {
                  control.getContainer()?.removeEventListener("input", handleChange) 
                  map.removeControl(control)
            }
      }, [])

      function handleChange(e: Event) {
            const day = 86400000;
            const threeDays = 259200000;
            const week = 604800000;
            
            const target = e.target as HTMLInputElement;
            const tooltip = document.getElementById('slider-tooltip')
            const tooltipText = document.getElementById('slider-tooltip-text')
            
            if (!tooltipText) return
            const valFromTop = 20 + (parseFloat(target.value) - 1) * 42
            tooltip?.setAttribute('style', 'top:' + valFromTop + 'px')       
            
            switch (target.value) {
                  case "1":
                        setFilter((Date.now() - day) / 1000)
                        tooltipText.innerText = 'Today'  
                        tooltipText.innerHTML          
                        break;
                  case "2":
                        setFilter((Date.now() - threeDays) / 1000)
                        tooltipText.innerText = 'Three days'   
                        break;
                  case "3":
                        setFilter((Date.now() - week) / 1000)
                        tooltipText.innerText = 'One week'   
                        break;
                  case "4":
                        setFilter(0)
                        tooltipText.innerText = 'All time'   
                        break;               
            }                 
      }

      return null
      }
  
export default SliderControl