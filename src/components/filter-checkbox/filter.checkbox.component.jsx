const FilterCheckbox = ({ className, id, checkboxName, checkStatus, onChangeHandler, onClickHandler, value }) => {

    return (
        <input
            className={`checkbox ${className}`}
            type='checkbox'
            id={id}
            name={checkboxName}
            checked={checkStatus}
            onChange={onChangeHandler}
            onClick={onClickHandler}
            value={value}
        />
    )
}

export default FilterCheckbox;