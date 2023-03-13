import {applyMiddleware,createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'react-logger';

import rootReducer from '../reducers/rootReducer';

import rootSaga from '../saga/saga';



const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV !== 'development') {
    middlewares.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;