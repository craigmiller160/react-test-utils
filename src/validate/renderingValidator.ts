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

import { ReactWrapper } from 'enzyme';
import TraceError from 'trace-error';

export interface RenderedItemValue {
    text?: string;
    props?: object;
}

export type ValuesType = RenderedItemValue | RenderedItemValue[] | null;

/*
 * Behavior Rules
 *
 * 1) If values is array, then it expects multiple values.
 * 2) If values is array, and is length === 0, then expects not present
 * 3) If values is object, then it expects one value
 * 4) If values is null, then it expects not present
 */
export interface RenderedItem {
    selector: string;
    values: ValuesType;
}

const handleValue = (selector: string, foundItem: ReactWrapper, value: RenderedItemValue) => {
    try {
        if (value.text) {
            expect(foundItem.text()).toEqual(value.text);
        }
    } catch (ex) {
        const message = `Invalid item text: ${selector})`;
        throw new TraceError(message, ex as Error);
    }

    try {
        if (value.props) {
            expect(foundItem.props())
                .toEqual(expect.objectContaining(value.props));
        }
    } catch (ex) {
        const message = `Invalid item props: ${selector}`;
        throw new TraceError(message, ex as Error);
    }
};

const handleValuesArray = (selector: string, foundItem: ReactWrapper, values: RenderedItemValue[]) => {
    try {
        expect(foundItem).toHaveLength(values.length);
    } catch (ex) {
        const message = `Incorrect number of matches for item: ${selector}`;
        throw new TraceError(message, ex as Error);
    }

    if (values.length > 0) {
        try {
            expect(foundItem.exists()).toEqual(true);
        } catch (ex) {
            const message = `Item should exist but does not: ${selector}`;
            throw new TraceError(message, ex as Error);
        }
    } else {
        try {
            expect(foundItem.exists()).toEqual(false);
        } catch (ex) {
            const message = `Item should not exist: ${selector}`;
            throw new TraceError(message, ex as Error);
        }
    }

    values.forEach((value, index) => {
        const foundItemAtIndex = foundItem.at(index);
        try {
            handleValue(selector, foundItemAtIndex, value);
        } catch (ex) {
            const message = `Invalid item ${selector} at index ${index}`;
            throw new TraceError(message, ex as Error);
        }
    });
};

const isValuesArray = (values: ValuesType): values is RenderedItemValue[] => values instanceof Array;

const isValuesObject = (values: ValuesType): values is RenderedItemValue => {
    if (!(values instanceof Array)) {
        return values?.props !== undefined || values?.text !== undefined;
    }
    return false;
};

const renderingValidator = (wrapper: ReactWrapper, items: Array<RenderedItem>) => {
    items.forEach((item) => {
        const foundItem = wrapper.find(item.selector);
        if (isValuesArray(item.values)) {
            handleValuesArray(item.selector, foundItem, item.values);
        } else if (isValuesObject(item.values)) {
            handleValue(item.selector, foundItem, item.values);
        } else if (item.values === null) {
            try {
                expect(foundItem).toHaveLength(0);
            } catch (ex) {
                const message = `Item should not exist: ${item.selector}`;
                throw new TraceError(message);
            }
        } else {
            throw new Error('Invalid values property');
        }
    });
};

export default renderingValidator;
