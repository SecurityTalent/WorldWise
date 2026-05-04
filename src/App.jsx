import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import { useEffect, useState } from 'react';



function App() {

  const BASE_URL = "http://localhost:3001"

  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)



useEffect(() => {
  async function fetchCities() {
    try {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      // console.log("DATA:", data);
      setCities(data);
    } catch (err) {
      console.error("ERROR:", err);
    }
    finally{
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
            <Route index element={<CityList cities={cities} isLoading={isLoading} />} />                  //index route

            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
            <Route path="countries" element={<h2>countries</h2>} />
            <Route path="form" element={<h2>form</h2>} />
          </Route>

          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>


      {/* 02:05:00 Mim  */}


    </>
  )
}

export default App
