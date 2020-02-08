import React from 'react'



function handleClick () {
    console.log("hello");
}

function Suggestions(props) {
    
    const options = props.results.map(item => (
        <li onClick={handleClick}>{item.first_name} {item.last_name}</li>
    ))    
    
    return (
        <h1>{options}</h1>
    )
}

export default Suggestions