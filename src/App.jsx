import { useState, useEffect } from 'react';

import CountryList from './components/countries-list/country-list.component';
import SearchBox from './components/search-box/search-box.component';
import SortAlpha from './components/sort-alpha/sort-alpha.component';
import FilterCheckbox from './components/filter-checkbox/filter.checkbox.component';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  // Bringing data from an external api
  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then((response) => response.json())
      .then((countries_api) => setCountries(countries_api));
  }, []);
  // callback function containing the code we want to be inside of our hook + array of dependencies containing the dependencies (if any) that, if changed, will trigger the callback function

  useEffect(() => {
    const newFilteredCountries = countries.filter((country) => {
      return country.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredCountries(newFilteredCountries);
  }, [countries, searchField]);


  const onSearchChange = (event) /* We are going to get back an event */ => {
    const searchFieldString = event.target.value.toLocaleLowerCase(); /* describing the _non-empty_ search field and making it lowercase */

    setSearchField(searchFieldString);  /* setting the state to the list of _filtered_ countries */
  };

    return (
      <div className="App">

        <SearchBox className='search-box' onChangeHandler={onSearchChange} placeholder='Search countries' />

        <SortAlpha />

        <FilterCheckbox className='checkbox__area' id='area' />
        <label htmlFor='area'>Smaller than Lithuania</label>

        <FilterCheckbox className='checkbox__region' id='region' />
        <label htmlFor='region'>Located in Oceania</label><br />

        <CountryList classNameList='country__list' countries={filteredCountries} />
      </div>
    )
  }

export default App;
