import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, rootEpic } from '@system/store/roots';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(epicMiddleware))
    );

    epicMiddleware.run(rootEpic);

    return store;
};
