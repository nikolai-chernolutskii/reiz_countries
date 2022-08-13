const CountryData = ({ classNameListSubItem, children }) => {
        return (
            <p className={`country__data ${classNameListSubItem}`}> {children} </p>
        )
}

export default CountryData;