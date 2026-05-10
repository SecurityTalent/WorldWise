import React from 'react'
import Spinner from './Spinner'
import styles from "./CountryList.module.css"
import Message from './Message'
import CountryItem from './CountryItem'
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
   const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />
  if(!cities.length) return <Message text="No cities found. Please add some cities." />

  const uniqueCountries = cities.reduce((arr, city) => {
    if (arr.some(el => el.country === city.country)) return arr;

    return [...arr, { country: city.country, emoji: city.emoji }];
  }, []);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  )
}

export default CountryList;


