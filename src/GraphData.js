import React from "react"
import axios from "axios"
import "./GraphData.css"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'


const API_URL = "https://www.balldontlie.io/api/v1/stats?seasons[]=2019&per_page=100"


class GraphData extends React.Component{
    constructor(props){
        super()
        this.state = {
            id: props.id,
            results: [],
            selected: "pts"
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    getInfo = () => {
        axios.get(`${API_URL}&player_ids[]=${this.state.id}`)
        .then(({ data }) => {
            this.setState({
                 results: data.data
            })
        })
     }
     
       handleChange(event) {
         this.setState({selected: event.target.value});
       }
     
     componentDidMount() {
         this.getInfo()
     }
     
    
    render(){
        const sortedArr = ((this.state.results).sort(function(a,b){return a.id - b.id})).slice(Math.max(this.state.results.length - 10))
        // const ptsData = sortedArr.map(item => item.pts)
        
        const data = sortedArr
    
        
        
        return (
            <div>
                <div class="lastTen dropdown">
                     <h2 class="lastTenTitle">LAST TEN</h2>
                     <div>
                         <select class="btn btn-secondary" value={this.state.value} onChange={this.handleChange}>
                          <option selected value="pts">PTS</option>
                          <option value="ast">AST</option>
                          <option value="reb">REB</option>
                          <option value="stl">STL</option>
                          <option value="blk">BLK</option>
                          <option value="fgm">FGM</option>
                          <option value="fg_pct">FG%</option>
                          <option value="fg3m">3PM</option>
                          <option value="fg3_pct">3P%</option>
                          <option value="ft_pct">FT%</option>
                          <option value="turnover">TO</option>
                         </select>
                     </div>
                </div>
                
                <ResponsiveContainer width="90%" height={400}>
                     <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis/>
                        <Tooltip />
                        <Line isAnimationActive={false} type="monotone" dataKey={this.state.selected} stroke="#8884d8" strokeWidth={2}/>
                     </LineChart>
                </ResponsiveContainer>
            </div>

        )
    }
}

export default GraphData