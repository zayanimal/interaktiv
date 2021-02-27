import React, { useState, useEffect, useRef } from 'react';
import { IconButton, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { bem } from '@utils/formatters';
import './TableRowButton.scss';

const cn = bem('TableRowButton');

interface TableRowButtonProps {
    onEdit?: () => void;
    onRemove?: () => void;
}

const TableRowButton: React.FC<TableRowButtonProps> = (props) => {
    const { children, onEdit = () => {}, onRemove = () => {} } = props;
    const [open, setOpen] = useState(false);

    const paper = useRef<HTMLDivElement>(null);
    const onOpen = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (!paper.current?.contains(target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClick, false);

        return () => {
            document.removeEventListener('click', handleClick, false);
        };
    });

    return (
        <div ref={paper}>
            <IconButton size='medium' onClick={onOpen}>
                <MoreVertIcon fontSize='inherit' />
            </IconButton>
            {open && (
                <div className={cn('paper')}>
                    <MenuItem onClick={onEdit}>Редактировать</MenuItem>
                    <MenuItem onClick={onRemove}>Удалить</MenuItem>
                    {children}
                </div>
            )}
        </div>
    );
};

export { TableRowButton };
