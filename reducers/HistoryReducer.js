import { SET_LOG } from '../types/HistoryType'
const initState = {
    log_list: []
}
export default (state = initState, action) => {
    switch(action.type){
        case SET_LOG :
            return {...state, log_list: action.payload.log}
        default :
            return state
    }
}