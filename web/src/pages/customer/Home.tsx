import React from 'react';
import Page from '@containers/Layout';
import { Button } from '@material-ui/core';
import MyRequests from './MyRequests';
import ProjectRequest from '@containers/ProjectRequest';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

const Home: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <Page>
            <Switch>
                <Route exact path={path}>
                    <p>Рады вас видеть в нашей системе обработки запросов.</p>
                    <p>На данном ресурсе вы можете:</p>
                    <ol>
                        <li>Подобрать необходимое оборудование.</li>
                        <li>Посмотреть его наличие и цену.</li>
                        <li>Запросить проектную скидку.</li>
                        <li>Поставить резерв.</li>
                    </ol>
                    <p>Перейти:</p>
                    <div className="controls">
                        <div>
                            <Link to={`${path}/request`} className="controls__item non-decoration">
                                <Button variant="contained" color="secondary">
                                    Подобрать оборудование
                                </Button>
                            </Link>

                            <Link to={`${path}/my-requests`} className="controls__item non-decoration">
                                <Button variant="contained" color="secondary">
                                    Текущие запросы
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Route>
                <Route path={`${path}/my-requests`} component={MyRequests}/>
                <Route path={`${path}/request`} component={ProjectRequest}/>
            </Switch>
        </Page>
    );
};

export default Home;
