import { Component } from "react";

class FilterCheckbox extends Component {
    render() {

        const { className, id } = this.props;

        return (
            <input className={`checkbox ${className}`} type='checkbox' id={ id }/>
    )
    }
}

export default FilterCheckbox;