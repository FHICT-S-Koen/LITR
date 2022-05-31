import { LayersControl, MapContainer, TileLayer } from 'react-leaflet'
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
import { Control } from 'leaflet';

const {BaseLayer} = LayersControl;
const maps = [
	{name:'Night Mode',
	 attribution:'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors',
	 url:"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
	},

	{name:'Day Mode 2',
	 attribution:'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors',
	 url:"https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
	}
]


const Map: FC<{detections: DetectionProps[]}> = ({detections}) => {
	return <MapContainer center={[52.1009, 5.6463]} zoom={8} minZoom={8} scrollWheelZoom={true} className="h-screen">
		<Search />
		<LayersControl>
			<BaseLayer checked name="Day Mode">
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					bounds={[[50.6, 3.25], [54, 7.6]]}
					minNativeZoom={10}
				/>
			</BaseLayer>
				{maps.map(m => <BaseLayer name={m.name}>
				<TileLayer attribution={m.attribution} url={m.url} bounds={[[50.5, 3.25], [54, 7.6]]} minNativeZoom={10}/>
			</BaseLayer>)}
		</LayersControl>
		<ResetButton />
		<MarkerClusterGroup>
			{detections?.map(d => <Detection key={d.id} {...d} />)}
		</MarkerClusterGroup>
	</MapContainer>
}

export default Map