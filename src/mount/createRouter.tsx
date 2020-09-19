import React, { FC, PropsWithChildren, ElementType } from 'react';
import { MemoryRouter } from 'react-router';
import { History } from 'history';

const createRouter = (initialRouterEntries: Array<History.LocationDescriptor<any>>): ElementType<PropsWithChildren<{}>> => {
    const Router = (props: PropsWithChildren<{}>) => (
        <MemoryRouter initialEntries={ initialRouterEntries }>
            { props.children }
        </MemoryRouter>
    );

    return Router;
};

export default createRouter;
