import { Component } from "react";

 class CountryList extends Component {

    render() {

        const {countries, classNameList, classNameListItem, classNameListSubItem1, classNameListSubItem2, classNameListSubItem3} = this.props;

        return (
            <ul className={classNameList}>
              {
                countries.map(
                  (country) => {
                    return (
                      <li className={classNameListItem} key={country.name}>
                        <p className={classNameListSubItem1}>Country: {country.name}</p>
                        <p className={classNameListSubItem2}>Area: {country.area} km<sup>2</sup></p>
                        <p className={classNameListSubItem3}>Region: {country.region}</p>
                      </li>
                    )
                  })
              }
            </ul>
        )
    }
 }

 export default CountryList;