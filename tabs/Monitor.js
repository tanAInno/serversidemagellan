import React, {Component} from 'react';
import '../css/App.css'
import { connect } from 'react-redux'
import SCP from 'react-progressbar-semicircle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Monitor extends Component{

    renderPMNumber(){
        if(this.props.MonitorReducer.data.PM2_5 <= 35){
            return(
                <div className="data-number-green">
                    {this.props.MonitorReducer.data.PM2_5}
                </div>
            )
        }
        else{
            return(
                <div className="data-number-red">
                    {this.props.MonitorReducer.data.PM2_5}
                </div>
            )
        }
    }

    renderTempNumber(){
        if(this.props.MonitorReducer.data.Temperature >= 23 && this.props.MonitorReducer.data.Temperature <= 27){
            return(
                <div className="data-number-green">
                    {this.props.MonitorReducer.data.Temperature}
                </div>
            )
        }
        else{
            return(
                <div className="data-number-red">
                    {this.props.MonitorReducer.data.Temperature}
                </div>
            )
        }
    }

    renderHumNumber(){
        if(this.props.MonitorReducer.data.Humidity >= 30 && this.props.MonitorReducer.data.Humidity <= 70){
            return(
                <div className="data-number-green">
                    {this.props.MonitorReducer.data.Humidity}
                </div>
            )
        }
        else{
            return(
                <div className="data-number-red">
                    {this.props.MonitorReducer.data.Humidity}
                </div>
            )
        }
    }

    renderPMStatus(){
        if(this.props.MonitorReducer.data.PM2_5 <= 35){
            return(
                <div className="data-status-good">
                    Good
                </div>
            )
        }
        else{
            return(
                <div className="data-status-bad">
                    Bad
                </div>
            )
        }
    }

    renderTempStatus(){
        if(this.props.MonitorReducer.data.Temperature >= 23 && this.props.MonitorReducer.data.Temperature <= 27){
            return(
                <div className="data-status-good">
                    Good
                </div>
            )
        }
        else{
            return(
                <div className="data-status-bad">
                    Bad
                </div>
            )
        }
    }

    renderHumStatus(){
        if(this.props.MonitorReducer.data.Humidity >= 30 && this.props.MonitorReducer.data.Humidity <= 70){
            return(
                <div className="data-status-good">
                    Good
                </div>
            )
        }
        else{
            return(
                <div className="data-status-bad">
                    Bad
                </div>
            )
        }
    }

    render () {
        return (
            <div className="content">
                <div className="device-name">DHT21Temp/Hum</div>
                <div className="content-row">
                    <div className="circle-box">
                        <div className="progress">
                            <SCP
                                percentage={this.props.MonitorReducer.data.PM2_5}
                                stroke="#A239CA"
                                background="#0e0b16"
                                strokeWidth="20"
                                diameter="270"/>
                        </div>
                        {this.renderPMNumber()}
                        <div className="data-header">
                            <FontAwesomeIcon icon="wind" className="icon"/> PM2_5
                        </div>
                        {this.renderPMStatus()}
                    </div>
                    <div className="circle-box" style={{marginLeft: 60, marginRight: 60}}>
                        <div className="progress">
                            <SCP
                                percentage={(this.props.MonitorReducer.data.Temperature/50)*100}
                                stroke="#A239CA"
                                background="#0e0b16"
                                strokeWidth="20"
                                diameter="270"/>
                        </div>
                        {this.renderTempNumber()}
                        <div className="data-header">
                            <FontAwesomeIcon icon="thermometer-half" className="icon"/> Temperature
                        </div>
                        {this.renderTempStatus()}
                    </div>
                    <div className="circle-box">
                        <div className="progress">
                            <SCP
                                percentage={this.props.MonitorReducer.data.Humidity}
                                stroke="#A239CA"
                                background="#0e0b16"
                                strokeWidth="20"
                                diameter="270"/>
                        </div>
                        {this.renderHumNumber()}
                        <div className="data-header">
                            <FontAwesomeIcon icon="tint" className="icon"/> Humidity
                        </div>
                        {this.renderHumStatus()}
                    </div>
                </div>
            </div>
        )
    }
    
}

export default connect(state => state)(Monitor)