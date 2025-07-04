import { createContext, useEffect, useContext, useReducer, useCallback } from "react"
const base_url = 'http://localhost:3001'

const CitiesContext = createContext()

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state, isLoading: true
            }
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }

        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            }

        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: {}
            }
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default: throw new Error('Unknown action type')

    }
}
const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: '',
}

function CitiesProvider({ children }) {

    const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
        reducer,
        initialState
    )

    /* const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({}) */



    useEffect(
        function () {
            async function fetchCities() {
                dispatch({ type: 'loading' })
                try {
                    const res = await fetch(`${base_url}/cities`)
                    const data = await res.json()
                    dispatch({ type: 'cities/loaded', payload: data })
                } catch { dispatch({ type: 'rejected', payload: 'There was an error loading data' }) }
            }
            fetchCities()
        }
        , [])

    const getCity = useCallback(async function getCity(id) {
        if (Number(id) === currentCity.id) return
        dispatch({ type: 'loading' })
        try {
            const res = await fetch(`${base_url}/cities/${id}`)
            const data = await res.json()
            dispatch({ type: 'city/loaded', payload: data })

        } catch { dispatch({ type: 'rejected', payload: 'There was an error loading data' }) }

    }, [currentCity.id])

    async function createCity(newCity) {
        dispatch({ type: 'loading' })

        try {
            const res = await fetch(`${base_url}/cities`, { method: "POST", body: JSON.stringify(newCity), headers: { "Content-Type": "application/json" } })
            const data = await res.json()

            dispatch({ type: "city/created", payload: data })
        } catch {

            dispatch({ type: 'rejected', paylod: 'There was an error loading city' })
            alert("There was an error loading city")
        }

    }

    async function deleteCity(id) {
        dispatch({ type: 'loading' })

        try {
            await fetch(`${base_url}/cities/${id}`, { method: "DELETE" },)
            dispatch({ type: 'city/loaded', payload: id })
        } catch {

            dispatch({ type: 'rejected', paylod: 'There was an error deleting city' })
            alert("There was an error deleting city")
        }
    }

    return (<CitiesContext.Provider value={{
        cities, isLoading, error, currentCity, getCity, createCity, deleteCity
    }}>
        {children}
    </CitiesContext.Provider>)
}

function useCities() {
    const context = useContext(CitiesContext)
    if (context === undefined) throw new Error('Outside provider')

    return context
}

export { CitiesProvider, useCities }