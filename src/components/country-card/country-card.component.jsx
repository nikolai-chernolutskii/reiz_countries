import { Component } from "react";
import CountryData from "../country-data/country-data.component";

class CountryCard extends Component {

    render() {

        const { classNameListItem } = this.props;

        const { name, area, region } = this.props.country;

        return (
            <li className={classNameListItem} key={name}>
                <CountryData classNameListSubItem='name'>Country: {name}</CountryData>

                <CountryData classNameListSubItem='area'>Area (km<sup>2</sup>): {area}</CountryData>

                <CountryData classNameListSubItem='region'>Region: {region}</CountryData>
            </li>
        )
    }

}

export default CountryCard;