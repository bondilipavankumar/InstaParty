import React,{useState} from 'react'
import './search.css'

const Search = ({onSearch}) => {
    const [search,setSearch] = useState('');

    const onInputChange = (value)=>{
        setSearch(value);
        onSearch(value)
    }
    return (
        <input 
            type="text"
            className="flow "
            placeholder="Search"
            value={search}
            onChange={(e)=>onInputChange(e.target.value)}
            />
    );
}

export default Search
