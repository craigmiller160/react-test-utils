import React, { Context, ElementType, PropsWithChildren } from 'react';

// TODO lower case contextType
const createContextProvider = <T extends object>(ContextType: Context<T>, contextValue: T): ElementType<PropsWithChildren<{}>> => {
    const TestContext = (props: PropsWithChildren<{}>) => (
        <ContextType.Provider value={ contextValue }>
            { props.children }
        </ContextType.Provider>
    );

    return TestContext;
};

export default createContextProvider;
