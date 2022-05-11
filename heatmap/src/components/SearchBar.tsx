import React from 'react'

const SearchBar = ({}) => {
  return (
    <div className='flex justify-center mb-3 xl:w-96'>
      <input onChange={e => console.log(e.target.value)} list="cities" className='absolute z-[999] bg-white left-1/2 -translate-x-1/2 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ' placeholder='Enter City' v-model="textInput"/>
        <datalist id="cities">
          <option value="Eindhoven">51.441643 5.469722</option>
          <option value="Amsterdam">52.370216 4.895168</option>
          <option value="Breda">51.571915 4.768323</option>
        </datalist>
    </div>
  )
}

export default SearchBar