import { useState } from "react";

const Select = ({ onOrderByChange }) => {

    const [checkedState, setCheckedState] = useState('AZ');

    const handleChange = (event) => {
        setCheckedState(event.target.value)
    }

    return (
        <div>
            <label htmlFor="AZ">Order AZ</label>
            <input
                id="AZ"
                type="radio"
                value="AZ"
                checked={checkedState === 'AZ'}
                onChange={handleChange}
                onClick={() => onOrderByChange('asc')}
        />

            <label htmlFor="ZA">Order ZA</label>
            <input
                id="ZA"
                type="radio"
                value="ZA"
                checked={checkedState === 'ZA'}
                onChange={handleChange}
                onClick={() => onOrderByChange('desc')}
            />
        </div>
    )
}

const SortAlpha = ({ sortBy, onSortByChange, orderBy, onOrderByChange }) => {
    return (
        <div className="sortAlphaContainer">
            <h2>Sort countries</h2>
            <Select
                sortBy={sortBy}
                onSortByChange={mySort => onSortByChange(mySort)}
                orderBy={orderBy}
                onOrderByChange={myOrder => onOrderByChange(myOrder)}
            />
        </div>
    )
}

export default SortAlpha;