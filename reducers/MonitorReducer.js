import { SET_DATA1, SET_DATA2 } from '../types/MonitorType'
const initState = {
    data1: {},
    data2: {}
}
export default (state = initState, action) => {
    switch(action.type){
        case SET_DATA1 :
            return {...state, data1: action.payload.data}
        case SET_DATA2 :
            return {...state, data2: action.payload.data}
        default :
            return state
    }
}