import { map } from 'leaflet'
import React from 'react'

const SearchBar = ({}) => {
  const list = [
    {name:"Eindhoven", coords:{lat:51.441643, lon:5.469722}},
    {name:"Amsterdam", coords:{lat:52.370216, lon:4.895168}},
    {name:"Breda", coords:{lat:51.571915, lon:4.768323}}
  ]
  return (
    <div className='flex justify-center mb-3 xl:w-96'>
      <input onChange={e => console.log(e.target.value)} list="cities" className='absolute z-[999] bg-white left-1/2 -translate-x-1/2 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ' placeholder='Enter City' v-model="textInput"/>
        <datalist id="cities">
          {list.map((m, i) => <option key={i} value={m.name}>{m.name}</option>)}
        </datalist>
    </div>
  )
}

export default SearchBar