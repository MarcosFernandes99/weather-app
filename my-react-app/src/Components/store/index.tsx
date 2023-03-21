import {combineReducers, createStore} from "redux"
import ModalReducer from "./redux.modal/reducer"
import CityReducer from "./redux.city/reducer"
import SetDayState from "./redux.day/reducer"

const reducers = combineReducers({
modal: ModalReducer,
city: CityReducer,
day: SetDayState,
})

const store = createStore(reducers)

export default store