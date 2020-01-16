import React from 'react';
import Home from './pages/customer/Home';
import Supplier from './pages/supplier/Supplier';
import Vendor from './pages/vendor/Vendor';
import Admin from './pages/admin/Admin';
import Page from './views/Page';
import Auth from './pages/Auth';
import { Switch, Route, Redirect } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/customer" component={Home}/>
            <Route path="/supplier" component={Supplier}/>
            <Route path="/vendor" component={Vendor}/>
            {/* Admin */}
            <Route path="/admin" component={Admin}/>
            {/* Root */}
            <Route exact path="/" component={Page}/>
            {/* Error */}
            <Route exact path="/error" component={() => (<div>Page not found</div>)}/>
            <Redirect to="/error" />
        </Switch>
    );
}

export default App;
