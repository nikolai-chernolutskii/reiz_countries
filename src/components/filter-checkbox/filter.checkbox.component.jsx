const FilterCheckbox = ({ className, id }) => {

    return (
        <input className={`checkbox ${className}`} type='checkbox' id={id} />
    )
}

export default FilterCheckbox;