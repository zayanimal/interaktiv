import { createElement } from 'react';
import AllInbox from '@material-ui/icons/AllInbox';
import Ballot from '@material-ui/icons/Ballot';
import AddBox from '@material-ui/icons/AddBox';
import AccountBox from '@material-ui/icons/AccountBox';
import People from '@material-ui/icons/People';
import { bem } from '@utils/formatters';
import './Drawer.scss';

const cn = bem('Drawer');

const icons = new Map([
    ['AllInbox', AllInbox],
    ['Ballot', Ballot],
    ['AddBox', AddBox],
    ['AccountBox', AccountBox],
    ['People', People]
]);

export const DrawerIcon = (icon: string) => createElement(
    (icons.get(icon) || 'div'),
    { className: cn('icon') }
);
