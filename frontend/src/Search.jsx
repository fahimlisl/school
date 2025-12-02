import React from 'react'

const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div>
        <input type="text"
        value={searchTerm}
        onChange={(e) =>  setSearchTerm(e.target.value)}
         />{" "}
         {searchTerm}
    </div>
  )
}

export default Search