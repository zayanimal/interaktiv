import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from '@system/components/PrivateRoute';
import { Layout } from '@system/containers/Layout';
import { Auth } from '@system/containers/Auth';
import { systemActions } from '@system/store/actions';
import { systemSelectors } from '@system/store/selectors';
import { tokenService } from '@system/services/token.service';


// const mapStateToProps = (state) => ({

// });

// const mapDispatchToProps = {

// };

const App: React.FC = () => (
    <Switch>
        <Route path="/auth" component={Auth} />
        <PrivateRoute
            path="/"
            component={Layout}
            permission={false}
        />
    </Switch>
);

// const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export { App };
