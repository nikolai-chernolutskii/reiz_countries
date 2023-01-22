import { useState, useEffect } from 'react';

import CountryList from './components/countries-list/country-list.component';
import SearchBox from './components/search-box/search-box.component';
import SortAlpha from './components/sort-alpha/sort-alpha.component';
import FilterCheckbox from './components/filter-checkbox/filter.checkbox.component';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [searchField, setSearchField] = useState('');
  const [orderBy, setOrderBy] = useState('asc');
  const [sortBy, setSortBy] = useState('name');
  const [checkRegion, setCheckRegion] = useState(false);
  const [checkArea, setCheckArea] = useState(false);

  // Bringing data from an external api
  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then((response) => response.json())
      .then((countries_api) => setCountries(countries_api));
  }, []);
  // callback function containing the code we want to be inside of our hook + array of dependencies containing the dependencies (if any) that, if changed, will trigger the callback function

  useEffect(() => {
    const newFilteredCountries = countries.filter((country) => {
      return (
        country.name.toLocaleLowerCase().includes(searchField) ||
        country.region.toLocaleLowerCase().includes(searchField) /* ||
        country.region === 'Oceania' */
      )
    }).sort((a, b) => {
      let order = (orderBy === 'asc') ? 1 : -1;
      return (
        a[sortBy].toLocaleLowerCase() < b[sortBy].toLocaleLowerCase()
          ? -1 * order : 1 * order
      )
    });

    setFilteredCountries(newFilteredCountries);

  }, [countries, searchField, orderBy, sortBy]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase(); /* describing the _non-empty_ search field and making it lowercase */

    setSearchField(searchFieldString); /* setting the state to the list of _filtered_ countries */
  };

  const handleCheckRegion = (event) => {
    const regionStatus = event.target.checked;

    // if (event.target.checked === true) {
    //   setCheckRegion(regionStatus)
    // } 

    setCheckRegion(regionStatus)

    console.log(event)
  };

  const handleCheckArea = (event) => {
    const areaStatus = event.target.checked;

    setCheckArea(areaStatus)

    console.log(event)
  }

  return (
    <div className="App">

      <SearchBox
        className="searchbox"
        placeholder='Search countries/regions'
        onChangeHandler={onSearchChange}
      />

      <SortAlpha
        sortBy={sortBy}
        onSortByChange={mySort => setSortBy(mySort)}
        orderBy={orderBy}
        onOrderByChange={myOrder => setOrderBy(myOrder)}
      />

      <br />

      <FilterCheckbox
        className='checkbox__region'
        id='region'
        checkboxName='region'
        checkStatus={checkRegion === true}
        onChangeHandler={handleCheckRegion}
        value='oceania'
        // onClickHandler
        />
        <label htmlFor='region'>Located in Oceania</label>
        
        <FilterCheckbox
        className='checkbox__area'
        id='area'
        checkboxName='area'
        checkStatus={checkArea === true}
        onChangeHandler={handleCheckArea}
        value='lit_smaller'
        // onClickHandler
      />
      <label htmlFor='area'>Smaller than Lithuania</label>
      <br />

      <CountryList classNameList='country__list' countries={filteredCountries} />
    </div>
  )
}

export default App;
