import { createContext, useReducer } from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";


const BASE_URL = "http://localhost:3001"

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",

}

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true,
            }

        case 'cities/loaded':
            return {
                ...state,
                cities: action.payload,
                isLoading: false,
            }

        case 'city/loaded':
            return {
                ...state,
                currentCity: action.payload,
                isLoading: false,
            }

        case 'city/created':
            return {
                ...state,
                cities: [...state.cities, action.payload],
                isLoading: false,
                currentCity: action.payload,
            }

        case 'city/deleted':
            return {
                ...state,
                cities: state.cities.filter(city => city.id !== action.payload),
                isLoading: false,
            }

        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }

        default:
            throw new Error(`Unknown action type: ${action.type}`)
    }

}


function CitiesProvider({ children }) {

    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);
    // const [cities, setCities] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: 'loading' })
            // setIsLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                // console.log("DATA:", data);
                // setCities(data);
                dispatch({ type: 'cities/loaded', payload: data });

            } catch (err) {
                // console.error("ERROR:", err);
                dispatch({ type: 'rejected', payload: err.message })
            }
            // finally {
            //     setIsLoading(false)
            // }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        if(currentCity.id === Number(id)) return;


        dispatch({ type: 'loading' })
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            // console.log("DATA:", data);
            // setCurrentCity(data);
            dispatch({ type: 'city/loaded', payload: data });
        } catch (err) {
            dispatch({ type: 'rejected', payload: err.message });
        }
        // finally {
        //     setIsLoading(false)
        // }
    }

    async function createCity(newCity) {
        dispatch({ type: 'loading' })
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCity)
            });
            const data = await res.json();
            // console.log("DATA:", data);
            // setCities(prevCities => [...prevCities, data]);
            dispatch({ type: 'city/created', payload: data });
        } catch (err) {
            dispatch({ type: 'rejected', payload: err.message });
            // console.error("ERROR:", err);
        }
        // finally {
        //     setIsLoading(false)
        // }
    }

    async function deleteCity(id) {
        dispatch({ type: 'loading' })
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: 'city/deleted', payload: id });

            // setCities(prevCities => prevCities.filter(city => city.id !== id));

        } catch (err) {
            dispatch({ type: 'rejected', payload: err.message });
            // console.error("ERROR:", err);
        }
        // finally {
        //     setIsLoading(false)
        // }
    }


    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, error, getCity, createCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    )

}


function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("useCities must be used within a CitiesProvider")
    }
    return context;
}

export { CitiesProvider, useCities }