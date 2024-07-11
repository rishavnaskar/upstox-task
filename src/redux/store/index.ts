import createSagaMiddleWare from 'redux-saga';
import {reducer} from '../reducers';
import {configureStore} from '@reduxjs/toolkit';
import {handler} from '../saga/handler';

const sagaMiddleWare = createSagaMiddleWare();

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare().concat(sagaMiddleWare),
});

sagaMiddleWare.run(handler);
