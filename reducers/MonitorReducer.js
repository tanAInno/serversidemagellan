import { SET_DATA } from '../types/MonitorType'
const initState = {
    data: {}
}
export default (state = initState, action) => {
    switch(action.type){
        case SET_DATA :
            return {...state, data: action.payload.data}
        default :
            return state
    }
}