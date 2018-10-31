import React, {Component} from 'react';
import './css/App.css'
import { connect } from 'react-redux'
import { setData } from './actions/MonitorAction'
import axios from 'axios'
import Monitor from './tabs/Monitor'
import History from './tabs/History'
import { Tabs,TabLink,TabContent } from 'react-tabs-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faThermometerHalf, faWind } from '@fortawesome/free-solid-svg-icons'

library.add(faTint,faThermometerHalf,faWind)

class App extends Component {

    state = {
        now: new Date()
    }

    componentDidMount(){
        this.getData()
        this.get_interval = setInterval(() => {
            this.getData()
            this.setState({now : new Date()})
        }, 2000)
        this.post_interval = setInterval(() => {
            this.postData()
        }, 60000)
    }

    pad = (n) => {
        return (n < 10) ? ("0" + n) : n;
    }

    componentWillUnmount(){
        clearInterval(this.get_interval)
        clearInterval(this.post_interval)
    }

    async postData(){
        console.log("post")
        console.log()
        await axios.post("http://localhost:8080/api/magellans/",{
            name: "DHT21Temp/Hum",
            PM2_5: this.props.MonitorReducer.data.PM2_5,
            Temperature: this.props.MonitorReducer.data.Temperature,
            Humidity: this.props.MonitorReducer.data.Humidity,
            Date: this.pad(this.state.now.getDay())+"/"
            +this.pad(this.state.now.getMonth())+"/"
            +this.pad(this.state.now.getFullYear())+" "
            +this.pad(this.state.now.getHours())+":"
            +this.pad(this.state.now.getMinutes())+":"
            +this.pad(this.state.now.getSeconds())
        }).catch(error => console.log(error))
    }

    async getData(){
        await fetch("http://localhost:5000/aismagellan/things")
        .then(response => 
            response.json()).then(json => {
                this.props.dispatch(setData(json))
        }).catch(error => console.log(error))
    }

    render () {
        return (
            <Tabs className="app-container"
                activeLinkStyle={{borderBottom: "5px solid #4716F6"}}>
                <div className="app-wrapper">
                    <div className="banner">
                        <TabLink className="header-text-wrapper" to="monitor">
                            Monitoring
                        </TabLink>
                        <TabLink className="header-text-wrapper" to="report">
                            Report
                        </TabLink>
                        <TabLink className="header-text-wrapper" to="history">
                            History
                        </TabLink>
                    </div>
                    <TabContent for="monitor">
                        <Monitor/>
                    </TabContent>
                    <TabContent for="report">
                    </TabContent>
                    <TabContent for="history">
                        <History/>
                    </TabContent>
                </div>
            </Tabs>
        )
    }

}

export default connect(state => state)(App)