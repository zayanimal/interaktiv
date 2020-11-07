import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface Props {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    open: boolean;
    onClose: () => void;
}

const Alert = (props: AlertProps) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
);

const Notification: React.FC<Props> = (props) => {
    const {
        type,
        message,
        open,
        onClose
    } = props;

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        onClose();
    };

    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type}>
                { message }
            </Alert>
        </Snackbar>
    );
};

export { Notification };
