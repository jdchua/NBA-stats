import React from "react"
import axios from "axios"
import Fade from '@material-ui/core/Fade';
import "./SeasonAverages.css"
import GraphData from "./GraphData"

const API_URL = 'https://www.balldontlie.io/api/v1/season_averages?season'

class SeasonAverages extends React.Component{
    constructor (props){
        super()
        this.state = {
            id: props.id,
            firstName: props.firstname,
            lastName: props.lastname,
            position: props.position,
            results:[],
            team: props.team,
            isloading: true

        }
    }
    
    getInfo = () => {
        axios.get(`${API_URL}&player_ids[]=${this.state.id}`)
        .then(({ data }) => {
            this.setState({
                 results: data.data
            })
        })
     }
     
     componentDidMount() {
        this.getInfo(); 
        setTimeout(() => {
            this.setState({
                isLoading: true
            });
          }, 800);
        this.setState({
            isLoading: false
        });
     }
     
    render() {
        const gp = this.state.results.map(item => <span>{item.games_played}</span>)
        const min = this.state.results.map(item => <span>{item.min}</span>)
        const fgm = this.state.results.map(item => <span>{item.fgm}</span>)
        const fga = this.state.results.map(item => <span>{item.fga}</span>)
        const fgp = this.state.results.map(item => <span>{(item.fgm/item.fga).toPrecision(3).slice(1)}%</span>)
        const fg3m = this.state.results.map(item => <span>{item.fg3m}</span>)
        const fg3a = this.state.results.map(item => <span>{item.fg3a}</span>)
        const fg3p = this.state.results.map(item => <span>{(item.fg3m/item.fg3a).toPrecision(3).slice(1)}%</span>)
        const ftm = this.state.results.map(item => <span>{item.ftm}</span>)
        const fta = this.state.results.map(item => <span>{item.fta}</span>)
        const ftp = this.state.results.map(item => <span>{(item.ftm/item.fta).toPrecision(3).slice(1)}%</span>)
        const orb = this.state.results.map(item => <span>{item.oreb}</span>)
        const drb = this.state.results.map(item => <span>{item.dreb}</span>)
        const reb = this.state.results.map(item => <span>{item.reb}</span>)
        const ast = this.state.results.map(item => <span>{item.ast}</span>)
        const stl = this.state.results.map(item => <span>{item.stl}</span>)
        const blk = this.state.results.map(item => <span>{item.blk}</span>)
        const tov = this.state.results.map(item => <span>{item.turnover}</span>)
        const pf = this.state.results.map(item => <span>{item.pf}</span>)
        const pts = this.state.results.map(item => <span>{item.pts}</span>)
      
        let listings =
            <div className="center" style={{display: this.state.isLoading ? "block" : "none" }}>            
                <div className="playerInfo">
                    <div class="name">
                        <h3>{this.state.firstName} {this.state.lastName}</h3>
                        <h6>Position: {this.state.position} | Team: {this.state.team}</h6>
                    </div>
                    <div class="statsRow">
                        <p class="avgStats">GP {gp}</p>
                        <p class="avgStats">MIN {min}</p>
                        <p class="avgStats">FGM {fgm}</p>
                        <p class="avgStats">FGA {fga}</p>
                        <p class="avgStats">FGA {fgp}</p>
                        <p class="avgStats">3PM {fg3m}</p>
                        <p class="avgStats">3PA {fg3a}</p>
                        <p class="avgStats">3P% {fg3p}</p>
                        <p class="avgStats">FTM {ftm}</p>
                        <p class="avgStats">FTA {fta}</p>
                        <p class="avgStats">FT% {ftp}</p>
                        <p class="avgStats">ORB {orb}</p>
                        <p class="avgStats">DRB {drb}</p>
                        <p class="avgStats">REB {reb}</p>
                        <p class="avgStats">AST {ast}</p>
                        <p class="avgStats">STL {stl}</p>
                        <p class="avgStats">BLK {blk}</p>
                        <p class="avgStats">TOV {tov}</p>
                        <p class="avgStats">PF {pf}</p>
                        <p class="avgStats">PTS {pts}</p>
                    </div>
                    <GraphData id={this.state.id}/>
                    <div class="hr"></div>
                </div>
            </div>

        return (
            <div class="container">
                <Fade in={this.state.isLoading}>
                    {listings}
                </Fade>
            </div>
        )
    }
}

export default SeasonAverages