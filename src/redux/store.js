// import { createStore,applyMiddleware } from "redux"

// import loginReducer from "./reducers/login_reducer"
// import thunk from "redux-thunk"

// export default createStore(loginReducer,applyMiddleware(thunk))

import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import loginReducer from "./reducers/login_reducer"
import userReducer from "./reducers/user_reducer"

const presisiConfig = {
    key: "root",
    storage
}

let rootReducer = combineReducers({ login: loginReducer, user: userReducer })
const myPersisReducer = persistReducer(presisiConfig, rootReducer)
const store = createStore(myPersisReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
export default store