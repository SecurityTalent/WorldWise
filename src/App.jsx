import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './App.css'
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import { useEffect, useState } from 'react';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';



function App() {

  const BASE_URL = "http://localhost:3001"

  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path='pricing' element={<Pricing />} />

          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />

            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
            <Route path="cities/:id" element={<City />} />          {/* const { id } = useParams(); */}


            <Route path="countries" element={<CountryList countries={cities} isLoading={isLoading} /> } />
            <Route path="form" element={<Form />} />
          </Route>

          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>


      {/* 18  */}


    </>
  )
}

export default App
