import React, {Component} from 'react';
import '../css/App.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { setLog } from '../actions/HistoryAction'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'react-widgets/dist/css/react-widgets.css';
import moment from "moment";

class History extends Component {

    state = {
        log_list: [],
        from_date: moment(),
        to_date: moment()
    }

    componentDidMount(){
        this.getLog()
    }

    getDateTimeDiffer(logDate){
        let dateTime = logDate.split(" ")
        let date = dateTime[0].split("/")
        let day = date[0]
        let month = date[1]
        let year = date[2]
        let time = dateTime[1].split(":")
        let hour = time[0]
        let min = time[1]
        let sec = time[2]
        let timeformat = year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec
        let timesec = moment(timeformat)
        let fromtimesec = moment(this.state.from_date.format("YYYY-MM-DD HH:mm:ss"))
        let totimesec = moment(this.state.to_date.format("YYYY-MM-DD HH:mm:ss"))
        if(timesec >= fromtimesec && totimesec >= timesec)
            return true
        else
            return false
    }

    filterLog(){
        let temp_log_list = []
        for(let i=0; i<this.props.HistoryReducer.log_list.length; i++){
            if(this.getDateTimeDiffer(this.props.HistoryReducer.log_list[i].Date))
                temp_log_list.push(this.props.HistoryReducer.log_list[i])
        }
        this.setState({log_list : temp_log_list})
    }

    onChangeFromDate = from_date => {
        this.setState({from_date},() => this.filterLog())
    }

    onChangeToDate = to_date => {
        this.setState({to_date},() => this.filterLog())
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
            this.setState({log_list:this.props.HistoryReducer.log_list})
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
                <div className="filter-container">
                    <div className="date-text">From</div>
                        <DatePicker
                            className="date-picker"
                            selected={this.state.from_date}
                            onChange={this.onChangeFromDate}
                            dateFormat="DD/MM/YYYY HH:mm"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                        />
                    <div className="date-text">To</div>
                        <DatePicker
                            className="date-picker"
                            selected={this.state.to_date}
                            onChange={this.onChangeToDate}
                            dateFormat="DD/MM/YYYY HH:mm" 
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                        />
                </div>
                <div className="table">
                    <div className="table-header">
                        <div className="header-name">Name</div>
                        <div className="header-pm">PM2_5</div>
                        <div className="header-temp">Temperature</div>
                        <div className="header-hum">Humidity</div>
                        <div className="header-date">Date</div>
                    </div>
                    {this.state.log_list.map((data,index) => {
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