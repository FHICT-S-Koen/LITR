import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { FC } from 'react';

import Detection, { DetectionProps } from './Detection'


interface MapProps {
	detections: DetectionProps[]
}


const Map: FC<MapProps> = ({ detections }) => {

	// 51.4415968, 5.4696465
	return <MapContainer center={[0, 0]} zoom={13} scrollWheelZoom={true} className="h-screen">
		<TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>\
		{detections.map(d => <Detection key={d.id} {...d} />)}
	</MapContainer>
}

export default Map