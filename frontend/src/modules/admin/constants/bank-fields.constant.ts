import { bem } from '@utils/formatters';

const cn = bem('BankRequisitesFields');
const classes = { class: cn('input'), labelClass: cn('label') };

export const BANK_FIELDS = [
    { label: 'Название', name: 'name', ...classes },
    { label: 'Расчётный счёт', type: 'number', name: 'rs', ...classes },
    { label: 'Корреспондентский счёт', type: 'number', name: 'ks', ...classes },
    { label: 'БИК', name: 'bik', type: 'number', ...classes },
    { label: 'Адрес', name: 'address', ...classes }
];
