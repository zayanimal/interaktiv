import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    // useLocation,
    useRouteMatch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { RootStateTypes } from '@config/roots';

const mapStateToProps = (state: RootStateTypes) => ({

});

const mapDispatchToProps = {

};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Companies: React.FC<Props> = (props) => {
    // const {} = props;

    // const { pathname } = useLocation();
    const { path } = useRouteMatch();

    useEffect(() => {

    }, []);

    return (
        <Switch>
            <Route path={`${path}/add`} />
            <Route path={`${path}/edit/:company`} />
            <Route
                exact
                path={path}
                render={() => (<div>Hello</div>)}
            />
        </Switch>
    );
};

const CompaniesConnected = connect(mapStateToProps, mapDispatchToProps)(Companies);

export { CompaniesConnected as Companies };
