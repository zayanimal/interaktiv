import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, rootEpic } from '@system/store/roots';
import { processType } from '@utils/pocessType';

const epicMiddleware = createEpicMiddleware();

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        (processType('development')
            ? composeWithDevTools(applyMiddleware(epicMiddleware))
            : applyMiddleware(epicMiddleware)),
    );

    epicMiddleware.run(rootEpic);

    return store;
};
