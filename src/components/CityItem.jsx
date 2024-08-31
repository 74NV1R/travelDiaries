import { Link } from 'react-router-dom'
import styles from './CityItem.module.css'
import PropTypes from 'prop-types'
import { useCities } from '../context/CitiesContext'

CityItem.propTypes = {
    city: PropTypes.shape({
        cityName: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired
    }).isRequired,
}

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(date))



export default function CityItem({ city }) {
    const { currentCity } = useCities()
    const { cityName, emoji, date, id, position } = city

    return (
        <li>
            <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ""} `} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}
                </h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times; </button>
            </Link>

        </li>
    )
}
