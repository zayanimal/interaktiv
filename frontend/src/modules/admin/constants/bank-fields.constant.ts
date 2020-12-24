import { bem } from '@utils/formatters';

const cn = bem('BankRequisitesFields')
const classes = { class: cn('input'), labelClass: cn('label') };

export const BANK_FIELDS = [
    { label: 'Название', name: 'name', ...classes },
    { label: 'Расчётный счёт', name: 'rs', ...classes },
    { label: 'Корреспондентский счёт', name: 'ks', ...classes },
    { label: 'БИК', name: 'bik', ...classes },
    { label: 'Адрес', name: 'address', ...classes },
];
