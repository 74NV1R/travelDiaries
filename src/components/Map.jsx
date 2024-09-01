import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import styles from './Map.module.css'
import { useEffect, useState } from 'react'
import { useCities } from '../context/CitiesContext'
import { useGeolocation } from '../hooks/UseGeolocation'
import Button from './Button'
import useUrlPosition from '../hooks/useUrlPosition'


export default function Map() {
    const navigate = useNavigate()
    const { cities } = useCities()

    const [mapPosition, setMapPosition] = useState([48.85, 2.35])
    const { isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition } = useGeolocation()

    const [mapLat, mapLng] = useUrlPosition()


    //const lat = searchParams.get('lat')
    //const lng = searchParams.get('lng')

    useEffect(function () {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(function () {
        if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }, [geolocationPosition])

    return (

        <div className={styles.mapContainer} >
            {!geolocationPosition && <Button type='position' onClick={getPosition}>{isLoadingPosition ? 'Loading...' : 'Use your position'}</Button>}
            <MapContainer
                center={mapPosition}
                //center={[mapLat, mapLng]}
                zoom={6} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                    <Popup>
                        {city.cityName}: {city.notes}
                    </Popup>
                </Marker>)}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>


        </div>
    )
}

function DetectClick() {
    const navigate = useNavigate()
    useMapEvent({
        click: e => {
            //console.log(e.latlng.lat, e.latlng.lng)
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)

    return null
}
