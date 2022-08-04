import { Component } from "react";

class CountryData extends Component {
    render() {

        const { classNameListSubItem, children } = this.props;

        return (
            <p className={`country__data ${classNameListSubItem}`}> {children} </p>
        )
    }
}

export default CountryData;