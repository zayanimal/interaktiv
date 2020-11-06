import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import configureStore from '@system/store/configureStore';
import { App } from '@system/containers/App';
import './index.scss';

const store = configureStore();

const app = (
    <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <App />
        </MuiPickersUtilsProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
