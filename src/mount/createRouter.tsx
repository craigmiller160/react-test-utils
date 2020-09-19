import React, { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';
import { History } from 'history';

const createRouter = (initialRouterEntries: Array<History.LocationDescriptor<object>>) => {
    const Router = (props: PropsWithChildren<object>) => (
        <MemoryRouter initialEntries={ initialRouterEntries }>
            { props.children }
        </MemoryRouter>
    );

    return Router;
};

export default createRouter;
