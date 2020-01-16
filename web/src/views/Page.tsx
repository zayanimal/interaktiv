import React, { Fragment, ReactNode } from 'react';
import Header from '../layout/Header';
import Main from '../layout/Main';
import Footer from '../layout/Footer';
import { Breadcrumbs, Typography } from '@material-ui/core';

interface PageProps {
    stock?: boolean, 
    children?: ReactNode
}

const Page = ({ stock, children }: PageProps) => (
    <Fragment>
        <Header stock={stock} />
        <Main>
            <Breadcrumbs className="main__breadcrumbs">
                <Typography color="textPrimary">Главная</Typography>
                <Typography color="textPrimary">Текущие проекты</Typography>
            </Breadcrumbs>
            { children }
        </Main>
        <Footer/>
    </Fragment>
);

export default Page;
