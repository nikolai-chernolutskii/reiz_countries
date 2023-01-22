import { useState, useEffect } from 'react';

import CountryList from './components/countries-list/country-list.component';
import SearchBox from './components/search-box/search-box.component';
import SortAlpha from './components/sort-alpha/sort-alpha.component';
import FilterCheckbox from './components/filter-checkbox/filter.checkbox.component';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [searchField, setSearchField] = useState('');
  const [orderBy, setOrderBy] = useState('asc');
  const [sortBy, setSortBy] = useState('name');
  const [checkRegion, setCheckRegion] = useState(false);
  const [checkArea, setCheckArea] = useState(false);
  //////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetching the countries
  useEffect(() => {
    // set loading to true
    setLoading(true);
    // fetch the data from the API
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      // convert the received response to JSON
      .then((response) => response.json())
      // assign the "countries_api" name to the received data, call the setCountries function to set the state of the countries variable to the received data
      .then((countries_api) => setCountries(countries_api))
      // set loading to false, as it is done loading
      .then(() => setLoading(false))
      // handle errors - call the setError function
      .catch((error) => setError(error));
  }, /* set the dependency array as empty so that the useEffect function runs only after the first render */[]);

  // Filtering the countries
  useEffect(() => {
    const newFilteredCountries = countries.filter((country) => {
      // array of conditions to filter the countries
      // !checkRegion || country.region === 'Oceania' - if the checkRegion is false, the country.region === 'Oceania' condition is ignored
      // !checkArea || country.area < 65300 - if the checkArea is false, the country.area < 65300 condition is ignored
      const conditions = [country.name.toLocaleLowerCase().includes(searchField) || country.region.toLocaleLowerCase().includes(searchField), !checkRegion || country.region === 'Oceania', !checkArea || country.area < 65300];
      // Array.every() method to check if all the conditions are true for each country. If all the conditions are true, the country is added to the newFilteredCountries array and displayed on the page
      return conditions.every(condition => condition);
    }).sort((a, b) => {
      let order = (orderBy === 'asc') ? 1 : -1;
      return (
        a[sortBy].toLocaleLowerCase() < b[sortBy].toLocaleLowerCase()
          ? -1 * order : 1 * order
      )
    });

    setFilteredCountries(newFilteredCountries);
  }, [countries, searchField, orderBy, sortBy, checkRegion, checkArea]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase(); /* describing the _non-empty_ search field and making it lowercase */

    setSearchField(searchFieldString); /* setting the state to the list of _filtered_ countries */
  };

  const handleCheckRegion = (event) => {
    const regionStatus = event.target.checked;

    setCheckRegion(regionStatus)
  };

  const handleCheckArea = (event) => {
    const areaStatus = event.target.checked;

    setCheckArea(areaStatus)
  }

  //////////////////////////
  const paginatedCountries = filteredCountries.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const handlePageSizeChange = event => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  };

  if (loading) return <h2>Country list is loading...</h2>;
  if (error) return <pre>Oops! Something went wrong...</pre>;
  if (!countries) return <h1>No data available</h1>;

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
      />
      <label htmlFor='region'>Located in Oceania</label>

      <FilterCheckbox
        className='checkbox__area'
        id='area'
        checkboxName='area'
        checkStatus={checkArea === true}
        onChangeHandler={handleCheckArea}
        value='lit_smaller'
      />
      <label htmlFor='area'>Smaller than Lithuania</label>
      <br />

      <div>
        <label htmlFor="page-size-select">Items per page:</label>
        <select id="page-size-select" onChange={handlePageSizeChange} value={pageSize}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredCountries.length / pageSize)}>
          Next
        </button>
      </div>

      <br />

      <CountryList classNameList='country__list' countries={paginatedCountries} />
    </div>
  )
}

export default App;
