import React from 'react';
import { Layout } from '@system/containers/Layout';
import { Auth } from '@system/components/Auth';
import { Switch, Route, Redirect } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Switch>
            <Route path="/auth" component={Auth}/>
            {/* Root */}
            <Route path="/" component={Layout}/>
            {/* Error */}
            <Route exact path="/error" component={() => (<div>Page not found</div>)}/>
            <Redirect to="/error" />
        </Switch>
    );
}

export { App };
