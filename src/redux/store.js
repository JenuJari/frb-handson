import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

let middleware = null;

// loading required middlewares depending upon the environment
if (process.env.NODE_ENV === "production") {
  middleware = applyMiddleware(
    sagaMiddleware
  );
} else {
  middleware = composeWithDevTools(
    applyMiddleware(sagaMiddleware, logger)
  );
}

const store = createStore(rootReducer, middleware);

export default store;

sagaMiddleware.run(rootSaga);