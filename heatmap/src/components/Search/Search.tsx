import React, { ChangeEvent } from 'react'
import { useMap } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'

import municipalities from './municipalities.json'

const SearchBar = () => {
  const list: {
    name: string; coords: LatLngTuple; area: number
  }[] = municipalities.map(m => ({
    name: m.name, 
    coords: [
      parseFloat(m.coords[0]), 
      parseFloat(m.coords[1])],
    area: parseFloat(m.area)
  }))
  
  const map = useMap()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const object= list.find(o => o.name.toLowerCase() == e.target.value.toLowerCase())
    if (object != null)
      map.setView(object.coords, 14 - 1 / (523.01 / object.area))
  }

  return (
    <div className='flex justify-center mb-3 xl:w-96'>
      <input onChange={handleChange} list="cities" className='absolute z-[999] bg-white left-1/2 -translate-x-1/2 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' placeholder='Enter City' v-model="textInput"/>
        <datalist id="cities">
          {list.map((m, i) => <option key={i} value={m.name}>{m.name}</option>)}
        </datalist>
    </div>
  )
}

export default SearchBar