import React, { Fragment } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import {
    Button,
} from '@material-ui/core';

const Stock: React.FC = () => (
    <>
        <p>В этом разделе вы можете закачать Excel файл с моделями и их наличием</p>
        <br />
        <a href="/">Образец файла</a>
        <br />
        <DropzoneArea dropzoneText="Перетащите файл с моделями и их наличием" />
        <br />
        <Button variant="contained" color="secondary">Отправить на сервер</Button>
    </>
);

export { Stock };
