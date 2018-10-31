import { SET_DATA } from '../types/MonitorType'
export const setData = (data) => {
    return dispatch => {
        dispatch({
            type: SET_DATA,
            payload: { data }
        })
    }
}
