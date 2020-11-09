import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RequestsList } from '@customer/containers/RequestsList';
import { Request } from '@customer/containers/Request';
import { bem } from '@utils/formatters';
import './Main.scss';

const cn = bem('Main');

export const Main: React.FC = () => (
    <main className={cn()}>
        <Switch>
            <Route path="/projects" component={RequestsList} />
            <Route path="/new-project" component={Request} />
        </Switch>
    </main>
);
