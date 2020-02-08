import React from "react"
import axios from "axios"
import Search from "./Search"

//get props from results and call on api for season averages

const API_URL = 'https://www.balldontlie.io/api/v1/season_averages?season'


class SeasonAverages extends React.Component{
    constructor (props){
        super()
        this.state = {
            id: props.id,
            firstName: props.firstName,
            lastName: props.lastName,
            results: []
        }
    }
    
    
    render() {
        return (
            <div>
                <p>{this.state.firstName} {this.state.lastName} {this.state.id}</p>
            </div>
        )
    }
}

export default SeasonAverages