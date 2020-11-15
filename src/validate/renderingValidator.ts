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

export interface RenderedItem {
    selector: string;
    values: Array<RenderedItemValue>;
}

const renderingValidator = (wrapper: ReactWrapper, items: Array<RenderedItem>) => {
    items.forEach((item) => {
        const foundItem = wrapper.find(item.selector);
        if (item.values.length > 0) {
            try {
                expect(foundItem.exists()).toEqual(true);
            } catch (ex) {
                const message = `Item should exist but does not: ${item.selector}`;
                throw new TraceError(message, ex);
            }
        } else {
            try {
                expect(foundItem.exists()).toEqual(false);
            } catch (ex) {
                const message = `Item should not exist: ${item.selector}`;
                throw new TraceError(message, ex);
            }
        }

        try {
            expect(foundItem).toHaveLength(item.values.length);
        } catch (ex) {
            const message = `Incorrect number of matches for item: ${item.selector}`;
            throw new TraceError(message, ex);
        }

        item.values.forEach((value, index) => {
            const foundItemAtIndex = foundItem.at(index);
            try {
                if (value.text) {
                    expect(foundItemAtIndex.text()).toEqual(value.text);
                }
            } catch (ex) {
                const message = `Invalid item text: ${item.selector} (${index})`;
                throw new TraceError(message, ex);
            }

            try {
                if (value.props) {
                    expect(foundItemAtIndex.props())
                        .toEqual(expect.objectContaining(value.props));
                }
            } catch (ex) {
                const message = `Invalid item props: ${item.selector} (${index})`;
                throw new TraceError(message, ex);
            }
        });
    });
};

export default renderingValidator;
