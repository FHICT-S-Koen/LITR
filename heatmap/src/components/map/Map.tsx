import { LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import Detection, { DetectionProps } from '../detection/Detection';
import Search from '../search/Search';
import { FC } from 'react';
import ResetButton from '../ResetButton';

import MarkerClusterGroup from './MarkerClusterGroup'
import "leaflet.markercluster/dist/leaflet.markercluster.js"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import { LatLng, LatLngBoundsExpression } from 'leaflet';

const { BaseLayer } = LayersControl;

const CENTER_OF_NETHERLANDS = new LatLng(52.1009, 5.6463)
const BOUNDS_OF_NETHERLANDS = [[50.6, 3.25], [54, 7.6]] as LatLngBoundsExpression

import maps from './maps.json'
const layers = () => maps.map((m, key) => 
	<BaseLayer key={key} checked={m.checked} name={m.name}>
		<TileLayer attribution={m.attribution} url={m.url} bounds={BOUNDS_OF_NETHERLANDS} minNativeZoom={8} />
	</BaseLayer>)

const config = {
	center: CENTER_OF_NETHERLANDS,
	maxBounds: BOUNDS_OF_NETHERLANDS,
	zoom: 8,
	minZoom: 8,
	scrollWheelZoom: true
}

const Map: FC<{ detections: DetectionProps[] }> = ({ detections }) => (
	<MapContainer {...config} className="h-screen">
		<LayersControl position="topright">
			{layers()}
		</LayersControl>
		<Search position="topright" />
		<ResetButton position="topleft" />
		<MarkerClusterGroup>
			{detections?.map(d => <Detection key={d.id} {...d} />)}
		</MarkerClusterGroup>
	</MapContainer>
)

export default Map