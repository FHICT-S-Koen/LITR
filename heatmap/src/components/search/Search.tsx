import React, { ChangeEvent, FC, useContext } from 'react'
import { LatLngTuple } from 'leaflet'

interface OptionProps {
  name: string; 
  coords: LatLngTuple
}

import { Context } from '../../pages/Store';

const Search: FC<{options: OptionProps[]}> = ({options}) => {
  const store = useContext(Context)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const object= options.find(o => o.name.toLowerCase() == e.target.value.toLowerCase())
    if (object != null)
      store.state.map?.setView(object.coords, 14)
  }

  return <>
    <input 
      onChange={handleChange}
      placeholder='Enter Location'
      className='absolute z-[999] left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 text-gray-700 border border-gray-300 rounded focus:border-blue-600 outline-none'
      list="municipalities" />
      <datalist id="municipalities">
        {options.map((m, i) => <option key={i} value={m.name}>{m.name}</option>)}
      </datalist>
  </>
}

export { Search as default, type OptionProps }