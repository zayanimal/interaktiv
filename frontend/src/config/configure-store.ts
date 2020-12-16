import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { processType } from '@utils/pocessType';
import { rootReducer, rootEpic } from '@config/roots';
import { dependencies } from '@config/dependencies';

const epicMiddleware = createEpicMiddleware({ dependencies });

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
