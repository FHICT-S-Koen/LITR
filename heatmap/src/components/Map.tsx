import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import MapProvider from './search/MapProvider';
import { useContext, useEffect } from 'react';
import { Context } from '../pages/Store';
import Detection from './detection/Detection';

const Map = () => {
	const store = useContext(Context)

	useEffect(() => {
	  	fetch('/api/detection')
		  	.then(res => res.json())
			.then((data) => 
				store.dispatch({type: "setDetections", payload: data})
			)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <MapContainer center={[52.1009, 5.6463]} zoom={9} scrollWheelZoom={true} className="h-screen">
		<MapProvider />
		{store.state.detections?.map(d => <Detection key={d.id} {...d} />)}
		<TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>\
	</MapContainer>
}

export default Map