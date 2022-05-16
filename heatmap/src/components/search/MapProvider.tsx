import { useContext, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { Context } from '../../pages/Store'

const MapHelper = () => {
	const store = useContext(Context)
	const map =  useMap()

	useEffect(() => {
		store.dispatch({type: 'setMap', payload: map})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [/*This causes performance issues if updated. Do not add to- or remove the dependency array.*/])
	return <></>
}

export default MapHelper