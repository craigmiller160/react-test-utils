import React, { Context, ContextType, ElementType, PropsWithChildren } from 'react';
import { mount } from 'enzyme';
import { History } from 'history';
import createReduxProvider from './createReduxProvider';
import { MockStoreEnhanced } from 'redux-mock-store';
import createRouter from './createRouter';
import createContextProvider from './createContextProvider';

interface OuterArgs<Props extends object, StoreState extends object, ContextValue extends object> {
    defaultProps: Props;
    defaultStoreState: StoreState;
    contextType: Context<ContextValue>;
    defaultContextValue: ContextValue;
    defaultInitialRouterEntries: Array<History.LocationDescriptor<any>>;
    defaultUseThunk: boolean;
}

interface InnerArgs<Props extends object, StoreState extends object, ContextValue extends object> {
    props: Props;
    storeState: StoreState;
    contextValue: ContextValue;
    initialRouterEntries: Array<History.LocationDescriptor<any>>;
    useThunk: boolean;
}

// TODO make Component have lower-case C

// defaultProps and defaultStoreState can have individual properties overridden, defaultInitialRouteEntries gets overridden in its entirety
const creator = <Props extends object, StoreState extends object, ContextValue extends object>(Component: ElementType<Props>, outerArgs?: OuterArgs<Props,StoreState,ContextValue>) => {
    return (innerArgs?: InnerArgs<Props,StoreState,ContextValue>) => {
        const actualProps: Partial<Props> = { // TODO is this the right type?
            ...(outerArgs?.defaultProps ?? {}),
            ...(innerArgs?.props ?? {})
        };

        let TestProviderWrapper: ElementType<PropsWithChildren<{}>> = (props: PropsWithChildren<{}>) => <div>{ props.children }</div>;
        let store: MockStoreEnhanced<Partial<StoreState>> | undefined = undefined;
        if (outerArgs?.defaultStoreState || innerArgs?.storeState) {
            const actualStoreState: Partial<StoreState> = { // TODO is this the right type?
                ...(outerArgs?.defaultProps ?? {}),
                ...(innerArgs?.props ?? {})
            };
            const actualUseThunk: boolean = !!(innerArgs?.useThunk || outerArgs?.defaultUseThunk);
            const providerAndStore = createReduxProvider<Partial<StoreState>>(actualStoreState, actualUseThunk);
            TestProviderWrapper = providerAndStore[0];
            store = providerAndStore[1];
        }

        let TestRouterWrapper: ElementType<PropsWithChildren<{}>> = (props: PropsWithChildren<{}>) => <div>{ props.children }</div>;
        if (outerArgs?.defaultInitialRouterEntries || innerArgs?.initialRouterEntries) {
            const actualInitialRouterEntries: Array<History.LocationDescriptor<any>> = innerArgs?.initialRouterEntries ?? outerArgs?.defaultInitialRouterEntries ?? [];

            TestRouterWrapper = createRouter(actualInitialRouterEntries);
        }

        let TestContextWrapper: ElementType<PropsWithChildren<{}>> = (props: PropsWithChildren<{}>) => <div>{ props.children }</div>;
        if (outerArgs?.contextType && (outerArgs?.defaultContextValue || innerArgs?.contextValue)) {
            const actualContextValue: Partial<ContextValue> = { // TODO is this correct?
                ...(outerArgs?.defaultContextValue ?? {}),
                ...(innerArgs?.contextValue ?? {})
            };
            TestContextWrapper = createContextProvider<Partial<ContextValue>>(outerArgs.contextType as unknown as Context<Partial<ContextValue>>, actualContextValue); // TODO fix this
        }

        const component = mount(
            <TestProviderWrapper>
                <TestRouterWrapper>
                    <TestContextWrapper>
                        <Component { ...actualProps } />
                    </TestContextWrapper>
                </TestRouterWrapper>
            </TestProviderWrapper>
        );

        return {
            component,
            store
        };
    };
};

export default creator;
