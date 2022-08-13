import CountryCard from "../country-card/country-card.component";

const CountryList = ({ countries, classNameList }) => {

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

export default CountryList;