import { combineReducers, createStore } from "redux";
import ownerReducer from './owner/reducer'
import ownersReducer from './owners/reducer'
import sidebarReducer from './sidebarMenu/reducer'
import openPopupEditReducer from './openPopupEdit/reducer'
import openPopupDeleteReducer from './openPopupDelete/reducer'
import carsReducer from './cars/reducer'

const reducers = combineReducers({
    ownerReducer,
    sidebarReducer,
    ownersReducer,
    openPopupEditReducer,
    openPopupDeleteReducer,
    carsReducer,
})

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store