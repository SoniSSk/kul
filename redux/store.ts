import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from "./rootReducer";

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const middleware: Array<any> = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

const persistConfig = {
  key: 'root',
  storage: storage
};
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;