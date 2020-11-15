/*
 * react-test-utils
 * Copyright (C) 2020 Craig Miller
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';
import { LocationDescriptor } from 'history';

export interface RouterOptions {
    initialEntries: Array<LocationDescriptor>;
    initialIndex: number;
}

const createTestRouter = (defaultOptions: RouterOptions) => (props: Partial<PropsWithChildren<RouterOptions>>) => {
    const actualOptions: RouterOptions = {
        ...defaultOptions,
        ...props
    };

    const { children } = props;

    return (
        <MemoryRouter
            initialEntries={ actualOptions.initialEntries }
            initialIndex={ actualOptions.initialIndex }
        >
            { children }
        </MemoryRouter>
    );
};

export default createTestRouter;
