import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import Detection, { DetectionProps } from './detection/Detection';
import Search from './search/Search';
import { FC } from 'react';
import ResetButton from './ResetButton';

const Map: FC<{detections: DetectionProps[]}> = ({detections}) => {
	return <MapContainer center={[52.1009, 5.6463]} attributionControl zoom={9} scrollWheelZoom={true} className="h-screen">
		<TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
		<Search />
		<ResetButton />
		{detections?.map(d => <Detection key={d.id} {...d} />)}
	</MapContainer>
}

export default Map