import React, { useState } from 'react'


const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const [inputValue, setInputValue] = useState(searchQuery || '');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const handleButtonClick = () => {
        setSearchQuery(inputValue);
    };
    
    return (
        <>
            <input
                placeholder='Search?' 
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleButtonClick}>Search</button>
        </>
  )
}

export default SearchBar