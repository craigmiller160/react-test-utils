import React, { Context, ElementType, PropsWithChildren } from 'react';

const createContext = <T extends object>(ContextType: Context<T>, contextValue: T): ElementType<PropsWithChildren<void>> => {
    const TestContext = (props: PropsWithChildren<void>) => (
        <ContextType.Provider value={ contextValue }>
            { props.children }
        </ContextType.Provider>
    );

    return TestContext;
};

export default createContext;
