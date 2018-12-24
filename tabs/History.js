import React, {Component} from 'react';
import '../css/App.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { setLog } from '../actions/HistoryAction'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'react-widgets/dist/css/react-widgets.css';
import moment from "moment";
import Select from 'react-select';

const options = [
    { value: 'All', label: 'All'},
    { value: 'DHT21Temp/Hum', label: 'DHT21Temp/Hum' },
    { value: 'IAQ', label: 'IAQ' }
]

class History extends Component {

    state = {
        log_list: [],
        iaq_list: [],
        dht_list: [],
        temp_list: [],
        from_date: "",
        to_date: "",
        selectedOption: null
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
        let fromtimesec = ""
        let totimesec = ""
        if(this.state.from_date != null && this.state.from_date != "")
            fromtimesec = moment(this.state.from_date.format("YYYY-MM-DD HH:mm:ss"))
        if(this.state.to_date != null && this.state.to_date != "")
            totimesec = moment(this.state.to_date.format("YYYY-MM-DD HH:mm:ss"))
        if(timesec >= fromtimesec && totimesec >= timesec ||
            timesec >= fromtimesec && (totimesec == "" || totimesec == null) ||
            totimesec >= timesec && (fromtimesec == "" || fromtimesec == null))
            return true
        else
            return false
    }

    filterLog(){
        let temp_log_list = []
        console.log("Fromdate : ", this.state.from_date)
        console.log("Todate : ", this.state.to_date)
        for(let i=0; i<this.state.temp_list.length; i++){
            if( (this.state.from_date == "" && this.state.to_date == "") ||
                (this.state.from_date == null && this.state.to_date == null) ||
                this.getDateTimeDiffer(this.state.temp_list[i].Date))
                    temp_log_list.push(this.state.temp_list[i])
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
        await axios.get("http://203.154.132.69:8080/api/magellans/")
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
            this.setState({temp_list: this.props.HistoryReducer.log_list})
            let temp_iaq_list = []
            let temp_dht_list = []
            for(let i=0; i<this.state.log_list.length; i++){
                if(this.state.log_list[i].name == "IAQ")
                    temp_iaq_list.push(this.state.log_list[i])
                if(this.state.log_list[i].name == "DHT21Temp/Hum")
                    temp_dht_list.push(this.state.log_list[i])
            }
            this.setState({iaq_list: temp_iaq_list})
            this.setState({dht_list: temp_dht_list})
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

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        if(selectedOption.value == "DHT21Temp/Hum")
            this.setState({temp_list: this.state.dht_list},() => this.filterLog())
        if(selectedOption.value == "IAQ")
            this.setState({temp_list: this.state.iaq_list},() => this.filterLog())
        if(selectedOption.value == "All")
            this.setState({temp_list: this.props.HistoryReducer.log_list},() => this.filterLog())
    }

    render(){
        return(
            <div className="content">
                <div className="filter-container">
                    <div className="filter-text">Filter</div>
                    <Select
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={options}
                        className="module-select"
                    />
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
                            placeholderText="Select initial time"
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
                            placeholderText="Select final time"
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
