import React, { ElementType, PropsWithChildren } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

// TODO make generic
const createReduxProvider = (storeState: object, useThunk: boolean): [ElementType<PropsWithChildren<void>>, MockStoreEnhanced<object,{}>] => {
    let middleware = [];
    if (useThunk) {
        middleware.push(thunk);
    }

    const mockStore = configureMockStore<object,{}>(middleware);
    const store: MockStoreEnhanced<object,{}> = mockStore(storeState);

    const ReduxProvider = (props: PropsWithChildren<void>) => (
        <Provider store={ store }>
            { props.children }
        </Provider>
    );

    return [ReduxProvider, store];
};

export default createReduxProvider;
