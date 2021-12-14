import { createStore, combineReducers, compose } from 'redux'
import countReducer from './reducer/count'
import loginReducer from './reducer/login'
import globalLoadingReducer from './reducer/globalLoading'

const rootReducer = combineReducers({
  countReducer,
  loginReducer,
  globalLoadingReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const store = createStore(rootReducer, composeEnhancers())
export default store
