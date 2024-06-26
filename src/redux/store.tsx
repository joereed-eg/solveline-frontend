import { applyMiddleware, legacy_createStore as createStore, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './index';
import rootSaga from './sagas/rootSaga';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
// redux persist configure
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

// if (process.env.NODE_ENV === 'development') {
//   // add other middlewares for development environments here
// }

const initializeStore = () => {
  let reduxStore = createStore(persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
  let persistor = persistStore(reduxStore)
  return { reduxStore, persistor }
}

const store = initializeStore()
sagaMiddleware.run(rootSaga);

export default store;