import CountryData from "../country-data/country-data.component";

const CountryCard = ({ classNameListItem, country }) => {

    const { name, area, region } = country;

    return (
        <li className={classNameListItem} key={name}>
            <CountryData classNameListSubItem='name'>Country: {name}</CountryData>

            <CountryData classNameListSubItem='area'>Area (km<sup>2</sup>): {area}</CountryData>

            <CountryData classNameListSubItem='region'>Region: {region}</CountryData>
        </li>
    )
}

export default CountryCard;