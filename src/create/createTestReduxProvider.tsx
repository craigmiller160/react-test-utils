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

import React, { ComponentType, PropsWithChildren } from 'react';
import thunk from 'redux-thunk';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';

export interface StoreHandler<State> {
    store?: MockStoreEnhanced<State>;
}

const createTestReduxProvider = <State extends object>(defaultState: State):
    [ComponentType<Partial<PropsWithChildren<State>>>, StoreHandler<State>] => {
    const storeHandler: StoreHandler<State> = {};
    const createMockStore = configureStore<State>([ thunk ]);

    const TestReduxProvider = (stateProps: Partial<PropsWithChildren<State>>) => {
        const actualState: State = {
            ...defaultState,
            ...stateProps
        };

        const store: MockStoreEnhanced<State> = createMockStore(actualState);
        storeHandler.store = store;

        return (
            <Provider store={ store }>
                { stateProps.children }
            </Provider>
        );
    };

    return [ TestReduxProvider, storeHandler ];
};

export default createTestReduxProvider;
