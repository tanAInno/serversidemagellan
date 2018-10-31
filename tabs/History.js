import React, {Component} from 'react';
import '../css/App.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { setLog } from '../actions/HistoryAction'

class History extends Component {

    state = {
        log_list: []
    }

    componentDidMount(){
        this.getLog()
    }

    async getLog(){
        await axios.get("http://localhost:8080/api/magellans/")
        .then(response => {
            const log_list = response.data.data.map(c => {
                return({
                    name: c.name,
                    PM2_5: c.PM2_5,
                    Temperature: c.Temperature,
                    Humidity: c.Humidity,
                    Date: c.Date
                })
            })
            this.props.dispatch(setLog(log_list))
        })

    }

    renderRow(data,index){
        if(index % 2 == 1){
            return(
                <div className="table-row-odd">
                    <div className="row-name-odd">{data.name}</div>
                    <div className="row-pm-odd">{data.PM2_5}</div>
                    <div className="row-temp-odd">{data.Temperature}</div>
                    <div className="row-hum-odd">{data.Humidity}</div>
                    <div className="row-date-odd">{data.Date}</div>
                </div>
            )
        }
        else{
            return(
                <div className="table-row-even">
                    <div className="row-name-even">{data.name}</div>
                    <div className="row-pm-even">{data.PM2_5}</div>
                    <div className="row-temp-even">{data.Temperature}</div>
                    <div className="row-hum-even">{data.Humidity}</div>
                    <div className="row-date-even">{data.Date}</div>
                </div>
            )
        }
    }

    render(){
        return(
            <div className="content">
                <div className="table">
                    <div className="table-header">
                        <div className="header-name">Name</div>
                        <div className="header-pm">PM2_5</div>
                        <div className="header-temp">Temperature</div>
                        <div className="header-hum">Humidity</div>
                        <div className="header-date">Date</div>
                    </div>
                    {this.props.HistoryReducer.log_list.map((data,index) => {
                        return(
                            this.renderRow(data,index)
                        )
                    })}
                </div>
            </div>
        )
    }

}

export default connect(state => state)(History)