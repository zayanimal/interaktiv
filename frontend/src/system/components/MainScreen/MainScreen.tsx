import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    useLocation
} from 'react-router-dom';
import { Drawer } from '@system/components/Drawer';
import { Header } from '@system/components/Header';
import { RequestsList } from '@customer/containers/RequestsList';
import { Request } from '@customer/containers/Request';
import { LayoutProps } from '@system/containers/Layout';
import { bem } from '@utils/formatters';
import './MainScreen.scss';

const cn = bem('MainScreen');

const MainScreen: React.FC<LayoutProps> = (props) => {
    const { isLoggedIn } = props;
    const location = useLocation();

    if (isLoggedIn) {
        return (
            <>
                <Drawer {...props} />
                <div className={cn()}>
                    <Header {...props} />
                    <main>
                        <Switch>
                            <Route path="/projects" component={RequestsList} />
                            <Route path="/new-project" component={Request} />
                        </Switch>
                    </main>
                </div>
            </>
        );
    }

    return <Redirect to={{ pathname: '/auth', state: { from: location } }} />;
};

export { MainScreen };
