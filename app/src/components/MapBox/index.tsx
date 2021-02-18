import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import mapboxgl from 'mapbox-gl';
import './map.css';
import {
  Box,
} from '@material-ui/core';
import { PROPERTIES } from '../../../config/properties';

mapboxgl.accessToken = PROPERTIES.MAPBOX_ACCESS_TOKEN; 

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      maxWidth: '220px',
      margin: theme.spacing(5, 1),
    },
  }),
);

interface IMapBox { }

const MapBox: React.FC<IMapBox> = () => {
  const classes = useStyles();

  const options = [
    {
      name: 'Population',
      description: 'Estimated total population',
      property: 'pop_est',
      stops: [
        [0, '#f8d5cc'],
        [1000000, '#f4bfb6'],
        [5000000, '#f1a8a5'],
        [10000000, '#ee8f9a'],
        [50000000, '#ec739b'],
        [100000000, '#dd5ca8'],
        [250000000, '#c44cc0'],
        [500000000, '#9f43d7'],
        [1000000000, '#6e40e6']
      ]
    },
    {
      name: 'GDP',
      description: 'Estimate total GDP in millions of dollars',
      property: 'gdp_md_est',
      stops: [
        [0, '#f8d5cc'],
        [1000, '#f4bfb6'],
        [5000, '#f1a8a5'],
        [10000, '#ee8f9a'],
        [50000, '#ec739b'],
        [100000, '#dd5ca8'],
        [250000, '#c44cc0'],
        [5000000, '#9f43d7'],
        [10000000, '#6e40e6']
      ]
    }
  ];
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(options[0]);
  const [map, setMap] = React.useState<mapboxgl.Map>();

  const [lng, setLng] = React.useState(5);
  const [lat, setLat] = React.useState(34);
  const [zoom, setZoom] = React.useState(1.5);

  
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

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Box minHeight="100%" width="100%" py={4} position="relative">
       <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </Box>
  );
};

export default MapBox;
