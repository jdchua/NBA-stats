import React from "react"
import axios from "axios"
import "./Search.css"
import SeasonAverages from "./SeasonAverages"
import GraphData from "./GraphData"

const API_URL = 'https://www.balldontlie.io/api/v1/players?per_page=10'

class Search extends React.Component {
    constructor(){
        super()
        
        this.displayData = []
        this.seasonAvgDisp = []
        this.graphData = []
        
        this.state = {
            query: "",
            results: [],
            name: "",
            clicked: false,
            seasonAvg: [],
            graphData: [],
            displayTitle: false
        }
        
        this.handleClick = this.handleClick.bind(this)
        this.removeSearch = this.removeSearch.bind(this)
    }

     getInfo = () => {
        axios.get(`${API_URL}&search=${this.state.query}`)
        .then(({ data }) => {
            this.setState({
                 results: data.data.filter(x => x.height_feet !== null)
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
      
      removeSearch (event) {
          event.target.remove()
          var index = this.seasonAvgDisp.map(x => {
            return x.props.id;
          }).indexOf(event.target.id);  
          
          this.seasonAvgDisp.splice(index, 1)
          this.graphData.splice(index, 1)
          
          this.setState({
              seasonAvg:[this.seasonAvgDisp.filter(x => {
              return x.props.id !== event.target.id;
              })],        
              graphData:[this.graphData.filter(x => {
              return x.props.id !== event.target.id;
              })]
          })
          //update
      }

      handleClick (event) {
          const seasonAverages =  <SeasonAverages id={event.target.id} position={event.target.getAttribute("position")} team={event.target.getAttribute("team")} firstname={event.target.getAttribute("firstName")} lastname={event.target.getAttribute("lastName")} class="display-data" />
          this.seasonAvgDisp.push(seasonAverages)
          const graphData =  <GraphData id={event.target.id}/>
          this.graphData.push(graphData)
          const searchBtn =  <div id={event.target.id} class="searchButtons col-4 col-md-4 col-lg-3 col-xl-2" firstname={event.target.getAttribute("firstName")} lastname={event.target.getAttribute("lastName")} onClick={this.removeSearch}><p class="display-data" > {event.target.getAttribute("firstName")} {event.target.getAttribute("lastName")}<i class="fas fa-times-circle"></i></p></div>
          this.displayData.push(searchBtn)
          this.setState({
              name: event.target.innerText,
              query: "",
              results: [],
              clicked: true,
              seasonAvg: [...this.seasonAvgDisp],
              graphData: [...this.graphData]
          }, () => this.setState({name: ""}));
          this.search.value = "";
      }

      handleSubmit (event) {
        event.preventDefault();
      }
      
    render (){
        const searchComponents = this.state.results.map(item => <p onClick={this.handleClick} id={item.id} position={item.position} team={item.team.abbreviation}firstname={item.first_name} lastname={item.last_name}>{item.first_name} {item.last_name} </p>)
        return (
            <div>
                <h3 className="pageTitle">2020 - 2021 NBA Season Averages</h3>
                <div className="cop">
                <div className="searchComponent">
                    <div className="searchInput">
                        <form className="search" onSubmit={this.handleSubmit}>
                           <input
                             placeholder="Search for a player e.g. Lebron James"
                             ref={input => this.search = input}
                             onChange={this.handleInputChange}
                           />
                          <div>
                            {searchComponents}
                          </div>
                        </form>
                    </div>
                    <div className="searchResults">
                        {this.displayData}
                    </div>
                </div>
                </div>
                <div>
                    {this.state.seasonAvg}
                </div>
            </div>
        )
    }
}

export default Search