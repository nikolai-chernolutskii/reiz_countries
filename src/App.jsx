import { Component } from 'react';

// import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      countries: [], // Initial state of array will be empty prior to receiving external data, the null state
    };
  }

  componentDidMount() {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
    .then((response) => response.json())
    .then((countries_api) => this.setState(
      () => {
      return {countries: countries_api}
    },
    () => {
      console.log(this.state);
    }
    ));
  }

  render() {
    return (
      <div className="App">
      <ul className='country__list'>
        {
          this.state.countries.map((country) => {
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
