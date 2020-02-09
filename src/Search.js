import React from "react"
import axios from "axios"
import "./Search.css"
import SeasonAverages from "./SeasonAverages"


const API_URL = 'https://www.balldontlie.io/api/v1/players?per_page=10'


class Search extends React.Component {
    constructor(){
        super()
        this.displayData = []
        
        this.state = {
            query: "",
            results: [],
            name: "",
            clicked: false,

        }
        
        this.handleClick = this.handleClick.bind(this)
        this.removeSearch = this.removeSearch.bind(this)
    }
    

     getInfo = () => {
        axios.get(`${API_URL}&search=${this.state.query}`)
        .then(({ data }) => {
            this.setState({
                 results: data.data
            })
        })
     }

        
      handleInputChange = () => {
        this.setState({
          query: this.search.value
        }, () => {
          if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
              this.getInfo()
            }
          }  else if (!this.state.query) {
          }
        })
      }
      
      handleClick (event) {
          this.setState({
              name: event.target.innerText,
              query: "",
              results: [],
              clicked: true
          }, () => this.setState({name: ""}));
          this.search.value = "";
      }
      
      removeSearch (event) {
          event.target.remove()
      }
      
      
    render (){
        if (this.state.clicked === true) {
            this.displayData.push(<div onClick={this.removeSearch} class="display-data">{this.state.name}</div>)
            this.setState ({clicked: false})
        }
        const searchComponents = this.state.results.map(item => <SeasonAverages type="submit" id={item.id} key={item.id} firstName={item.first_name} lastName={item.last_name} onClick={this.handleClick} />)
        return (
            <div class="container">
                <form class="search">
                   <input
                     placeholder="Search for..."
                     ref={input => this.search = input}
                     onChange={this.handleInputChange}
                   />
                  <div onClick={this.handleClick}>
                    {searchComponents}
                  </div>
                </form>
                <div class="searchResults">
                    {this.displayData}
                </div>
            </div>
            
        )
    }
}

export default Search