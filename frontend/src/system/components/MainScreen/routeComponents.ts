import { FC, lazy } from 'react';
import { LazyComponents } from '@system/interfaces/router.interface';

class RouteComponent {
    constructor(
        private RequestsList: FC,
        private Request: FC,
        private Users: FC,
        private Companies: FC,
        private Orders: FC
    ) {}

    create(name: LazyComponents) {
        return this[name];
    }
}

export const routeComponent = new RouteComponent(
    lazy(() => import('@customer/containers/RequestsList')),
    lazy(() => import('@customer/containers/Request')),
    lazy(() => import('@admin/containers/Users')),
    lazy(() => import('@admin/containers/Companies')),
    lazy(() => import('@admin/containers/Orders'))
);
