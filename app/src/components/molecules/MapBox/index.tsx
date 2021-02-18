import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import mapboxgl from 'mapbox-gl';
import './map.css';
import {
  Box,
} from '@material-ui/core';
import { PROPERTIES } from '../../../../config/properties';
import { ILocName } from '../../../types';

mapboxgl.accessToken = PROPERTIES.MAPBOX_ACCESS_TOKEN;

//IMPROVEMENT: Select city on map
const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      maxWidth: '220px',
      margin: theme.spacing(5, 1),
    },
  }),
);

interface IMapBox {
  neighbours?: ILocName[];
  selected?: ILocName;
}

const MapBox: React.FC<IMapBox> = ({
  neighbours,
  selected
}) => {
  const classes = useStyles();

  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const [lng, setLng] = React.useState(5);
  const [lat, setLat] = React.useState(34);
  const [zoom, setZoom] = React.useState(1.5);
  const [map, setMap] = React.useState<any>(null);

  // Initialize map when component mounts
  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current as any,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(Number(map.getCenter().lng.toFixed(4)));
      setLat(Number(map.getCenter().lat.toFixed(4)));
      setZoom(Number(map.getZoom().toFixed(2)));
    });

    setMap(map);

    // Clean up on unmount
    return () => map.remove();
  }, []);

  var selectedMarker: mapboxgl.Marker;
  var nearbyMarkers: mapboxgl.Marker[];

  React.useEffect(() => {
    if (selected) {
      selectedMarker?.remove();
      selectedMarker = new mapboxgl.Marker({
        color: '#0000FF',
        draggable: false
      }).setLngLat([selected.lon, selected.lat])
        .addTo(map);
    }
    if (neighbours) {
      if (nearbyMarkers) {
        nearbyMarkers.forEach(marker => marker.remove());
        nearbyMarkers = neighbours.map(city=>(new mapboxgl.Marker({
          color: '#008000',
          draggable: false
        }).setLngLat([city.lon, city.lat])));
        nearbyMarkers.forEach(marker=>marker.addTo(map));
      }
    }
  }, [selected, neighbours]);

  return (
    <Box minHeight="100%" width="100%" py={4} >
      <div className='map-container' ref={mapContainerRef} />
    </Box>
  );
};

export default MapBox;
