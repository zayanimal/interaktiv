import React from 'react';
import { Customer } from '@customer/containers/Customer';
import { Layout } from '@system/containers/Layout';
import { Auth } from '@system/components/Auth';
import { Switch, Route, Redirect } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/customer" component={Customer}/>
            {/* <Route path="/supplier" component={Supplier}/>
            <Route path="/vendor" component={Vendor}/> */}
            {/* Root */}
            <Route exact path="/" component={Layout}/>
            {/* Error */}
            <Route exact path="/error" component={() => (<div>Page not found</div>)}/>
            <Redirect to="/error" />
        </Switch>
    );
}

export { App };
