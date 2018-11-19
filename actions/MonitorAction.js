import { SET_DATA1, SET_DATA2 } from '../types/MonitorType'
export const setData1 = (data) => {
    return dispatch => {
        dispatch({
            type: SET_DATA1,
            payload: { data }
        })
    }
}

export const setData2 = (data) => {
    return dispatch => {
        dispatch({
            type: SET_DATA2,
            payload: { data }
        })
    }
}

