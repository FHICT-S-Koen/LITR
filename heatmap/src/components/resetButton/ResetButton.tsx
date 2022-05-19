import React, { useContext }from 'react'
import { Context } from '../../pages/Store';
import { LatLngTuple } from 'leaflet'


interface ResetButtonProps {
}

export const ResetButton: React.FC<ResetButtonProps> = ({}) => {
  	const store = useContext(Context)

    const currentLocation: LatLngTuple = [51.433333,5.483333] // Get Location of user
    const zoom = 14
		function resetLocation(){
			store.state.map?.setView(currentLocation, zoom)
		}

		return (
			<>
				<button
					onClick={resetLocation}
					placeholder='reset'
					className='absolute z-[999] right-2  mt-2 px-3 py-1.5 text-white border border-gray-300 rounded focus:border-blue-600 bg-blue-400 outline-none'
				>
					Reset
				</button>
			</>
		);
}

export { ResetButton as default, type ResetButtonProps }