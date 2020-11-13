import React, { Suspense } from 'react';
import {
    Switch,
    Route,
    Redirect,
    useLocation
} from 'react-router-dom';
import { Drawer } from '@system/components/Drawer';
import { Header } from '@system/components/Header';
import { LayoutProps } from '@system/containers/Layout';
import { routerService } from '@system/services/router.service';
import { bem } from '@utils/formatters';
import './MainScreen.scss';

const cn = bem('MainScreen');

const MainScreen: React.FC<LayoutProps> = (props) => {
    const { isLoggedIn, routerItems } = props;
    const location = useLocation();

    if (isLoggedIn) {
        return (
            <>
                <Drawer {...props} />
                <div className={cn()}>
                    <Header {...props} />
                    <main>
                        <Suspense fallback={null}>
                            <Switch>
                                {routerItems.map((route) => (
                                    <Route
                                        key={route.key}
                                        path={route.path}
                                        component={routerService.createComponent(route.component)}
                                    />
                                ))}
                            </Switch>
                        </Suspense>
                    </main>
                </div>
            </>
        );
    }

    return <Redirect to={{ pathname: '/auth', state: { from: location } }} />;
};

export { MainScreen };
