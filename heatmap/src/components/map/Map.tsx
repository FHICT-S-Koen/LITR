import { LayersControl, MapContainer, Marker, TileLayer } from 'react-leaflet'
import { LatLng, LatLngBounds } from 'leaflet';

import { FC } from 'react';
import Detection, { DetectionProps } from '../detection/Detection';
import SearchControl from '../search/SearchControl';
import ResetControl from '../ResetControl';

import MarkerClusterGroup from './MarkerClusterGroup'
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

const { BaseLayer } = LayersControl;

const CENTER_OF_NETHERLANDS = new LatLng(52.1009, 5.6463)
const BOUNDS_OF_NETHERLANDS = new LatLngBounds([[50.6, 3.25], [54, 7.6]])

import maps from './maps.json'
import SliderControl from '../SliderControl';
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
		<SearchControl position="topright" />
		<ResetControl position="topleft" />
		<SliderControl position="topleft"/>
		<MarkerClusterGroup>
			{detections?.map(d => <Detection key={d.id} {...d} />)}
		</MarkerClusterGroup>
	</MapContainer>
)

export default Map