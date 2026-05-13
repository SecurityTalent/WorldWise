import { createContext } from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";


const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const BASE_URL = "http://localhost:3001"

    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [currentCity, setCurrentCity] = useState({});


    useEffect(() => {
        async function fetchCities() {
            setIsLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                // console.log("DATA:", data);
                setCities(data);
            } catch (err) {
                console.error("ERROR:", err);
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchCities();
    }, []);




    async function getCity(id) {
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            // console.log("DATA:", data);
            setCurrentCity(data);
        } catch (err) {
            console.error("ERROR:", err);
        }
        finally {
            setIsLoading(false)
        }
    }

    async function createCity(newCity) {
        try {
            const res = await fetch(`${BASE_URL}/cities`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCity)
            });

            const data = await res.json();
            setCurrentCity(data);
            
            setCities(prevCities => [...prevCities, data]);

        } catch (err) {
            console.error("ERROR:", err);
        }
        finally {
            setIsLoading(false)
        }
    }


    async function deleteCity(id) {
        try {
            await fetch(`${BASE_URL}/cities/${id}`,{
                method: "DELETE",
            });

            setCities(prevCities => prevCities.filter(city => city.id !== id));

        } catch (err) {
            console.error("ERROR:", err);
        }
        finally {
            setIsLoading(false)
        }
    }





    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
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