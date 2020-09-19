import React, { FC, PropsWithChildren, ElementType } from 'react';
import { MemoryRouter } from 'react-router';
import { History } from 'history';

const createRouter = (initialRouterEntries: Array<History.LocationDescriptor<any>>): ElementType<PropsWithChildren<void>> => {
    const Router = (props: PropsWithChildren<void>) => (
        <MemoryRouter initialEntries={ initialRouterEntries }>
            { props.children }
        </MemoryRouter>
    );

    return Router;
};

export default createRouter;
