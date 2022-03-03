import { combineReducers, createStore } from "redux";
import ownerReducer from './owner/reducer'
import ownersReducer from './owners/reducer'
import sidebarReducer from './sidebarMenu/reducer'
import openPopupEditReducer from './openPopupEdit/reducer'
import openPopupServiceReducer from './openPopupService/reducer'
import openPopupDeleteReducer from './openPopupDelete/reducer'
import openPopupEditCarReducer from './openPopupEditCar/reducer'
import carsReducer from './cars/reducer'
import servicesReducer from './services/reducer'

const reducers = combineReducers({
    ownerReducer,
    sidebarReducer,
    ownersReducer,
    openPopupEditReducer,
    openPopupDeleteReducer,
    openPopupEditCarReducer,
    carsReducer,
    servicesReducer,
    openPopupServiceReducer,
})

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store