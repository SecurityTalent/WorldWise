import React, { useState } from 'react'
import styles from "./Map.module.css"
import { useNavigate, useSearchParams } from 'react-router'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext';


function Map() {

  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();



  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");


  return (
    <div
      className={styles.mapContainer}
      onClick={() => navigate('form')}
    >

      <MapContainer
        center={mapPosition}
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
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

      </MapContainer>

    </div>
  )
}

export default Map