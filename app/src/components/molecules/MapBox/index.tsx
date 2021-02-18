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
  const [selectedMarker, setSelectedMarker] = React.useState<mapboxgl.Marker>();
  const [nearbyMarkers, setNearbyMarkers] = React.useState<mapboxgl.Marker[]>();

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

  React.useEffect(() => {
    if (selected) {
      setSelectedMarker((oldState) => {

        if (oldState) oldState.remove();

        return new mapboxgl.Marker({
          color: '#0000FF',
          draggable: false
        }).setLngLat([selected.lon, selected.lat])
          .addTo(map);
      })
    }
  }, [selected]);

  React.useEffect(() => {
    if (neighbours) {
      setNearbyMarkers((oldState) => {

        if (oldState) oldState.forEach(marker => marker.remove());

        const tempNearbyMarkers = neighbours.map(city => (new mapboxgl.Marker({
          color: '#008000',
          draggable: false
        }).setLngLat([city.lon, city.lat])));

        tempNearbyMarkers.forEach(marker => marker.addTo(map));
        return tempNearbyMarkers;

      })
    }
  }, [neighbours]);

  return (
    <Box minHeight="100%" width="100%" py={4} >
      <div className='map-container' ref={mapContainerRef} />
    </Box>
  );
};

export default MapBox;
