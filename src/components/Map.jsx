import React, { useEffect, useState } from 'react'
import styles from "./Map.module.css"
import { useNavigate } from 'react-router'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';


function Map() {

  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();

  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();


  const [lat, lng] = useUrlPosition();


  useEffect(() => {
    if (lat && lng) {
      setMapPosition([Number(lat), Number(lng)]);
    }
  }, [lat, lng]);


  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }

  }, [geolocationPosition])


  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use my location"}
      </Button>}

      <MapContainer
        center={mapPosition}
        // center={[lat || mapPosition[0], lng || mapPosition[1]]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map(city => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          // position={mapPosition}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <DetectClick />
        <ChangeCenter position={mapPosition} />

      </MapContainer>

    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)

  })

  return null;
}

export default Map
