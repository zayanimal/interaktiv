import { ChangeEvent } from 'react';

export const handleInput = (callback: (val: string) => void) => (
    event: ChangeEvent<HTMLInputElement>,
) => { callback(event.target.value); };

export const handleSelect = (callback: (v: unknown | unknown[]) => void) => (
    event: ChangeEvent<{ value: unknown }>,
) => { callback(event.target.value); };
