import { Component } from "react";

class SortAlpha extends Component {
    render() {

        return (
            <div className="sortAlphaContainer">
                <label htmlFor="country_sort">Sort countries</label>
                <select name="sort" id="country_sort">
                    <option value="AZ">Sort A--&gt;Z</option>
                    <option value="ZA">Sort Z--&gt;A</option>
                </select>
            </div>
        )
    }
}

export default SortAlpha;