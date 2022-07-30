import { Component } from 'react';

import CountryList from './components/countries-list/country-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {

  constructor() {
    super();

    this.state = {
      countries: [], // Initial state of array will be empty prior to receiving external data, the null state

      searchField: '' // The initial state of the search field is empty, hence all the countries are displayed using the .map method in render() below
    };
  }

  // Bringing data from an external api
  componentDidMount() {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then((response) => response.json())
      .then((countries_api) => this.setState(
        () => {
          return { countries: countries_api }
        },
        () => {
          console.log(this.state);
        }
      ));
  }

  onSearchChange = (event) /* We are going to get back an event */ => {
    const searchField = event.target.value.toLocaleLowerCase(); /* describing the _non-empty_ search field and making it lowercase */

    this.setState(
      () => {
        return { searchField };
      }
    );  /* setting the state to the list of _filtered_ countries */
  }

  render() {

    const { countries, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredCountries = countries.filter(
      (country) => {
        return country.name.toLocaleLowerCase().includes(searchField);
      }
    );

    /* describing the list of filtered countries including the _empty_ search field */

    // We move this variable outside the return (below) because we always want to be able to come back to the original state when we unfilter the new array

    return (
      <div className="App">

        <SearchBox className='search-box' onChangeHandler={onSearchChange} placeholder='Search countries'  />

        <label htmlFor="sort">Sort countries</label>
        <select name="sort" id="country_sort">
          <option value="AZ">Sort A--&gt;Z</option>
          <option value="ZA">Sort Z--&gt;A</option>
        </select>

        <input className='checkbox checkbox__area' type='checkbox' id='area' /> <label htmlFor='area'>Smaller than Lithuania</label>

        <input className='checkbox checkbox__region' type='checkbox' id='region' /> <label htmlFor='region'>Located in Oceania</label><br />

        <CountryList classNameList='country__list' classNameListItem='country__group' classNameListSubItem1='name' classNameListSubItem2='area' classNameListSubItem3='region' countries={filteredCountries} />
      </div>
    )
  }
}

export default App;
