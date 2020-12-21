import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { App } from '@system/components/App';
import { configureStore } from '@config/configure-store';
import '@styles/index.scss';

const store = configureStore();

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <App />
            </MuiPickersUtilsProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
