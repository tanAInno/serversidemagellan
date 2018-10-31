import { SET_LOG } from '../types/HistoryType'
export const setLog = (log) => {
    return dispatch => {
        dispatch({
            type: SET_LOG,
            payload: { log }
        })
    }
}
