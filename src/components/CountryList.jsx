import React from 'react'
import Spinner from './Spinner'
import styles from "./CountryList.module.css"
import Message from './Message'
import CountryItem from './CountryItem'

function CountryList({ isLoading, countries }) {

  if (isLoading) return <Spinner />
  if (!countries.length) return <Message text="No countries found. Please add some countries." />

  const uniqueCountries = countries.reduce((arr, city) => {
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


