import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import Detection, { DetectionProps } from './detection/Detection';
import Search from './search/Search';
import { FC } from 'react';
import ResetButton from './ResetButton';

import MarkerClusterGroup from './MarkerClusterGroup'
import "leaflet.markercluster/dist/leaflet.markercluster.js"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

const Map: FC<{detections: DetectionProps[]}> = ({detections}) => {
	return <MapContainer center={[52.1009, 5.6463]} zoom={9} scrollWheelZoom={true} className="h-screen">
		<TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
		<Search />
		<ResetButton />
		<MarkerClusterGroup>
			{detections?.map(d => <Detection key={d.id} {...d} />)}
		</MarkerClusterGroup>
	</MapContainer>
}

export default Map