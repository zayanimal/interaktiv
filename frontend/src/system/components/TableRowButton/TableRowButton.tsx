import React, { useState, useEffect, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { bem } from '@utils/formatters';
import './TableRowButton.scss';

const cn = bem('TableRowButton');

const TableRowButton: React.FC = (props) => {
    const { children } = props;
    const [open, setOpen] = useState(false);

    const paper = useRef<HTMLDivElement>(null);
    const onOpen = () => { setOpen(!open); };

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
            <IconButton
                size="medium"
                onClick={onOpen}
            >
                <MoreVertIcon fontSize="inherit" />
            </IconButton>
            {open && (
                <div className={cn('paper')}>
                    {children}
                </div>
            )}
        </div>
    );
};

export { TableRowButton };
