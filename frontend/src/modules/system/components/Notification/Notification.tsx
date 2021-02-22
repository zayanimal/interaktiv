import React, { SyntheticEvent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { LayoutProps } from '@system/containers/Layout';

const Alert = (props: AlertProps) => (
    <MuiAlert elevation={6} variant='filled' {...props} />
);

const Notification: React.FC<LayoutProps> = (props) => {
    const {
        typeNotification,
        messageNotification,
        openNotification,
        closeNotification = () => {}
    } = props;

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        closeNotification();
    };

    return (
        <Snackbar
            open={openNotification}
            autoHideDuration={5000}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={typeNotification}>
                {messageNotification}
            </Alert>
        </Snackbar>
    );
};

export { Notification };
