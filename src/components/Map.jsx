import React, { useEffect, useState } from 'react'
import styles from "./Map.module.css"
import { useNavigate, useSearchParams } from 'react-router'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';


function Map() {

  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();

  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();


  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");


  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);



  return (
    <div
      className={styles.mapContainer}
      onClick={() => navigate('form')}
    >

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

        <ChangeCenter position={[lat || mapPosition[0], lng || mapPosition[1]]} />

      </MapContainer>

    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
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