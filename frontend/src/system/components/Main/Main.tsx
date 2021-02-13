import React from 'react';
import { MainScreen } from '@system/components/MainScreen';
import { LayoutProps } from '@system/containers/Layout';

export const Main: React.FC<LayoutProps> = (props) => {
    const { authFetched } = props;

    return authFetched ? MainScreen(props) : null;
};
