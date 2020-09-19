import React, { ElementType, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

const createReduxProvider = <T extends object>(storeState: T, useThunk: boolean): [ElementType<PropsWithChildren<{}>>, MockStoreEnhanced<T,{}>] => {
    let middleware = [];
    if (useThunk) {
        middleware.push(thunk);
    }

    const mockStore = configureMockStore<T,{}>(middleware);
    const store: MockStoreEnhanced<T,{}> = mockStore(storeState);

    const ReduxProvider = (props: PropsWithChildren<{}>) => (
        <Provider store={ store }>
            { props.children }
        </Provider>
    );

    return [ReduxProvider, store];
};

export default createReduxProvider;
