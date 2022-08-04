import { Component } from "react";
import CountryCard from "../country-card/country-card.component";

class CountryList extends Component {

  render() {
    // Destructuring
    const { countries, classNameList } = this.props;

    return (
      <ul className={classNameList}>
        {countries.map(
          (country) => {
            return (
              <CountryCard country={country}
                classNameListItem='country__group'
              />
            )
          })
        }
      </ul>
    )
  }
}

export default CountryList;