import { createStore, combineReducers, applyMiddleware } from 'redux'
import MonitorReducer from './reducers/MonitorReducer'
import HistoryReducer from './reducers/HistoryReducer'
import thunk from 'redux-thunk'
const reducer = combineReducers({
    MonitorReducer,
    HistoryReducer
})
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)
export default store