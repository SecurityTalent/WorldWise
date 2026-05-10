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
import { CitiesProvider } from './contexts/CitiesContext';



function App() {

  return (
    <>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path='pricing' element={<Pricing />} />

            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />

              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />          {/* const { id } = useParams(); */}


              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>

            <Route path='*' element={<PageNotFound />} />

          </Routes>
        </BrowserRouter>
      </CitiesProvider>

      {/* 01:30:00  */}


    </>
  )
}

export default App
