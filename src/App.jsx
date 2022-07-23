import { Component } from 'react';

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

  render() {

    const filteredCountries = this.state.countries.filter(
      (country) => {
        return country.name.toLocaleLowerCase().includes(this.state.searchField);
      }
    );

    /* describing the list of filtered countries including the _empty_ search field */

    // We move this variable outside the return (below) because we always want to be able to come back to the original state when we unfilter the new array

    return (
      <div className="App">

        <input className='search-box' type='search' placeholder='Search countries'

          onChange={
            (event) /* We are going to get back an event */ => {
              const searchField = event.target.value.toLocaleLowerCase(); /* describing the _non-empty_ search field and making it lowercase */

              this.setState(
                () => {
                  return { searchField };
                }
              )  /* setting the state to the list of _filtered_ countries */
            }
          }

        />

        <input className='checkbox checkbox__area' type='checkbox' id='area' /> <label htmlFor='area'>Smaller than Lithuania</label>

        <input className='checkbox checkbox__region' type='checkbox' id='region' /> <label htmlFor='region'>Located in Oceania</label>

        <ul className='country__list'>
          {
            filteredCountries.map(
              (country) => {
                return (
                  <li className='country__group' key={country.name}>
                    <p className='name'>Country: {country.name}</p>
                    <p className='area'>Area: {country.area} km<sup>2</sup></p>
                    <p className='region'>Region: {country.region}</p>
                  </li>

                  // <div className='country__group' key={country.name}>
                  // <p className='name'>Country: {country.name}</p>
                  // <p className='area'>Area: {country.area} km<sup>2</sup></p>
                  // <p className='region'>Region: {country.region}</p>
                  // </div>
                )
              })
          }
        </ul>
      </div>
    )
  }
}

export default App;
