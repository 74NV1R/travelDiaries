import { createContext, useState, useEffect, useContext } from "react"
const base_url = 'http://localhost:3001'

const CitiesContext = createContext()

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [currentCity, setCurrentCity] = useState({})

    useEffect(
        function () {
            async function fetchCities() {
                try {
                    setIsLoading(true)
                    const res = await fetch(`${base_url}/cities`)
                    const data = await res.json()
                    setCities(data)
                } catch { ('There was an error loading data') }
                finally {
                    setIsLoading(false)
                }
            }
            fetchCities()
        }
        , [])

    async function getCity(id) {

        try {
            setIsLoading(true)
            const res = await fetch(`${base_url}/cities/${id}`)
            const data = await res.json()
            setCurrentCity(data)
        } catch { ('There was an error loading data') }
        finally {
            setIsLoading(false)
        }

    }

    async function createCity(newCity) {

        try {
            setIsLoading(true)
            const res = await fetch(`${base_url}/cities`, { method: "POST", body: JSON.stringify(newCity), headers: { "Content-Type": "application/json" } })
            const data = await res.json()

            setCities((cities) => [...cities, data])
        } catch { ('There was an error loading data') }
        finally {
            setIsLoading(false)
        }

    }

    return (<CitiesContext.Provider value={{
        cities, isLoading, currentCity, getCity, createCity
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