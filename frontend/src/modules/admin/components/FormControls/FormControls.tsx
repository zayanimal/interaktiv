import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { bem } from '@utils/formatters';
import './FormControls.scss';

const cn = bem('FormControls');

interface Props {
    mode: boolean;
    backward: string;
    onEdit: () => void;
    onAdd: () => void;
    onClean?: () => void;
}

const FormControls: React.FC<Props> = (props) => {
    const {
        mode,
        backward,
        onEdit,
        onAdd,
        onClean = () => {},
    } = props;

    const history = useHistory();

    const onCancel = () => { onClean(); history.push(backward); }

    return (
        <div className={cn()}>
            <Button
                variant="text"
                color="primary"
                onClick={onCancel}
            >
                Назад
            </Button>
            <Button
                variant="text"
                color="primary"
                onClick={mode ? onEdit : onAdd}
            >
                {mode ? 'Сохранить' : 'Добавить'}
            </Button>
        </div>
    );
};

export { FormControls };
