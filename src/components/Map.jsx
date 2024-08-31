import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import styles from './Map.module.css'
import { useEffect, useState } from 'react'
import { useCities } from '../context/CitiesContext'


export default function Map() {
    const navigate = useNavigate()
    const { cities } = useCities()

    const [mapPosition, setMapPosition] = useState([48.85, 2.35])
    const [searchParams] = useSearchParams()

    const mapLat = searchParams.get('lat')
    const mapLng = searchParams.get('lng')


    //const lat = searchParams.get('lat')
    //const lng = searchParams.get('lng')

    useEffect(function () {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])
    return (

        <div className={styles.mapContainer} >
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
            //console.log(e)
            navigate(`form?lat=${e.latlng.lat}&${e.latlng.lng}`)
        }
    })
}

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)

    return null
}
