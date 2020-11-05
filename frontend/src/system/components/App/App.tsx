import React from 'react';
import { Layout } from '@system/containers/Layout';
import { Auth } from '@system/containers/Auth';
import { Switch, Route } from 'react-router-dom';

const App: React.FC = () => (
    <Switch>
        <Route path="/auth" component={Auth} />
        {/* Root */}
        <Route path="/" component={Layout} />
    </Switch>
);

export { App };
